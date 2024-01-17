// Importing the necessary modules
import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../model/User.js";

const signupRouter = Router();

signupRouter.post("/", async (req, res) => {
    try {
        // Destructuring 'fullName', 'email', and 'password' from the request body
        const { fullName, email, password } = req.body;

        // Checking if 'fullName', 'email', and 'password' are present in the request body
        if (!(fullName && email && password)) return res.status(400).json(
            { message: "Required fields: fullName or email or password not present in request body" }
        );

        // Checking if the email already exists in the database
        const existingUser = await User.findOne({ email });

        // If the email is already taken, returning a Bad Request (400) response
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hashing the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating a new user instance using the User model with hashed password
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        // Saving the new user to the database
        await newUser.save();

        // Sending a Created (201) response upon successful user creation
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        // Logging any errors that occur during the process
        console.log(error.message);

        // Sending a 500 Internal Server Error response in case of an error
        res.status(500).json({ message: "Some error occurred" });
    }
});

export default signupRouter;
