// Importing the necessary modules
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import { generateAccessToken } from "../utils/generateToken.js";

const refreshRouter = Router();

refreshRouter.post("/", async (req, res) => {
    try {
        // Extracting the refresh token from the request cookies
        const refreshToken = req.cookies?.refreshToken;

        // If no refresh token is present, sending a No Content (204) response
        if (!refreshToken) return res.sendStatus(204);

        // Finding a user with the specified refresh token in the database
        const user = await User.findOne({ refreshTokens: { $in: [refreshToken] } });

        // If no user is found with the provided refresh token, sending a Forbidden (403) response
        if (!user) return res.sendStatus(403);

        // Verifying the refresh token against the secret key
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET, // Assuming you have the secret stored in an environment variable
            (error, decoded) => {
                // If there's an error or the decoded user ID doesn't match the stored user ID, sending a Forbidden (403) response
                if (error || !user._id.equals(decoded._id)) return res.sendStatus(403);

                // Generating a new access token using the user's ID and full name
                const accessToken = generateAccessToken(user._id);

                // Sending a JSON response with the new access token
                res.json({ accessToken });
            }
        );
    } catch (error) {
        // Logging any errors that occur during the process
        console.error(error.message);

        // Sending a 500 Internal Server Error response in case of an error
        res.status(500).json({ message: "Some error occurred" });
    }
});

export default refreshRouter;
