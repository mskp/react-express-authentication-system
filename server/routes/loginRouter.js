// Importing the necessary modules
import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
    try {
        // Destructuring 'email' and 'password' from the request body
        const { email, password } = req.body;

        // Checking if 'email' and 'password' are present in the request body
        if (!(email && password))
            return res.status(400).json({
                message: "Required fields: email or password not present in request body"
            });

        // Finding a user with the specified 'email' in the database
        const user = await User.findOne({ email });

        // If no user is found, returning an authentication error
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        // Comparing the provided 'password' with the hashed password stored in the database
        const validPassword = await bcrypt.compare(password, user.password);

        // If the password is invalid, returning an authentication error
        if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

        // Generating an access token and a refresh token
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Updating the user document in the database to include the new refresh token
        await User.updateOne({ _id: user._id }, { $push: { refreshTokens: refreshToken } });

        // Setting a cookie with the refresh token for subsequent requests
        const maxAge = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge })

        // Sending the access token in the response
        res.json({ accessToken });
    } catch (error) {
        // Logging any errors that occur during the process
        console.log(error.message);

        // Sending a 500 Internal Server Error response in case of an error
        res.status(500).json({ message: "Some error occurred" });
    }
});

export default loginRouter;
