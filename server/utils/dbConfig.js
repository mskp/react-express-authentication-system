import mongoose from "mongoose";

// Establishing a connection to the MongoDB database using an (IIFE)
(async () => {
    try {
        // Attempting to connect to the MongoDB database using the provided URI from the environment variable
        await mongoose.connect(process.env.DATABASE_URI);

        // Logging a success message if the connection is established
        console.log("Database connected");
    } catch (error) {
        // Logging an error message and exiting the process with an error code if the connection fails
        console.log("Database not connected", error.message);
        process.exit(1);
    }
})();
