// Importing the necessary modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./utils/dbConfig.js"; // // IIFE for immediate database connection in this file

// Routers
import protectedRouter from "./routes/protectedRouter.js";
import refreshRouter from "./routes/refreshRouter.js";
import logoutRouter from "./routes/logoutRouter.js";
import loginRouter from "./routes/loginRouter.js";
import signupRouter from "./routes/signupRouter.js";

import verifyToken from "./middlewares/verifyToken.js";// Middleware for verifying access tokens


// Creating an Express application
const app = express();

// Setting the port for the server to listen on
const PORT = process.env.PORT;

// Configuring CORS options
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
const CORS_OPTIONS = {
    origin: (origin, callback) => {
        // Checking if the origin is allowed
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('This origin is not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

// Middleware setup
app.use(express.json()); // Parsing JSON requests
app.use(cookieParser()); // Parsing cookies
app.use(cors(CORS_OPTIONS)); // Configuring CORS

// API routes
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/refresh", refreshRouter);
app.use("/api/logout", logoutRouter);

// Middleware for protecting routes below this point
app.use(verifyToken);

// Protected routes
app.use("/api/protected", protectedRouter);

// Starting the server
app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
