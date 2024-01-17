import jwt from "jsonwebtoken";

// Function to generate an access token
export function generateAccessToken(userID) {
    // Signing a token with the user ID, using the access token secret and setting a 30-minute expiration time
    const accessToken = jwt.sign(
        { _id: userID },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
    );
    return accessToken;
}

// Function to generate a refresh token
export function generateRefreshToken(userID) {
    // Signing a token with the user ID, using the refresh token secret
    const refreshToken = jwt.sign({ _id: userID }, process.env.REFRESH_TOKEN_SECRET);
    return refreshToken;
}
