import jwt from "jsonwebtoken";

// Middleware to check if the request has a valid access token
export default function verifyToken(req, res, next) {
    // Extracting the 'authorization' header from the request
    const authHeader = req.header("authorization");

    // If 'authorization' header is not present, sending a Unauthorized (401) response
    if (!authHeader) return res.sendStatus(401);

    // Extracting the token from the 'authorization' header
    const token = authHeader.split(" ")[1];

    // Verifying the token against the secret key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        // If there's an error or the token is invalid, sending a Unauthorized (401) response
        if (err) return res.status(401).json({ message: "Invalid access token" });

        // If the token is valid, attaching the decoded user information to the request object
        req.user = decoded;

        // Passing control to the next route handler
        next();
    });
}
