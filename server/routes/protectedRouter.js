// Importing the necessary modules
import { Router } from "express";
import User from "../model/User.js";

const protectedRouter = Router();

protectedRouter.get("/", async (req, res) => {
    try {
        // Extracting the user ID from the authenticated user object in the request
        const userID = req.user._id;

        // Finding the user by ID and selecting only the 'fullName' field
        const data = await User.findById(userID).select({ _id: 0, fullName: 1 });

        // Sending a JSON response with a welcome message using the user's full name
        res.json({ message: `Welcome ${data.fullName}` });
    } catch (error) {
        // Logging any errors that occur during the process
        console.log(error.message);

        // Sending a 500 Internal Server Error response in case of an error
        res.status(500).json({ message: "Some error occurred" });
    }
});

export default protectedRouter;
