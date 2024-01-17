// Importing the necessary modules
import { Router } from "express";
import User from "../model/User.js";

const logoutRouter = Router();

logoutRouter.post("/", async (req, res) => {
    try {
        // Extracting the refresh token from the request cookies
        const refreshToken = req.cookies?.refreshToken;

        // If no refresh token is present, sending a No Content (204) response
        if (!refreshToken) return res.sendStatus(204);

        // Finding a user with the specified refresh token in the database
        const user = await User.findOne({ refreshTokens: { $in: [refreshToken] } });

        // If no user is found with the provided refresh token
        if (!user) {
            // Clearing the refresh token cookie and sending a No Content (204) response
            res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: "None" });
            return res.sendStatus(204);
        }

        // Removing the provided refresh token from the user's refreshTokens array
        await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { refreshTokens: refreshToken } },
            { new: true }
        );

        // Clearing the refresh token cookie and sending a Success (200) response
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: "None" });
        res.sendStatus(200);

    } catch (error) {
        // Logging any errors that occur during the process
        console.log(error.message);

        // Sending a 500 Internal Server Error response in case of an error
        res.status(500).json({ message: "Some error occurred" });
    }
});

export default logoutRouter;
