import jwt from "jsonwebtoken";

// Authorization middleware function
export const authorization = (req, res, next) => {
    // Extracting authorization header from the request
    const authHeader = req.headers['authorization'];

    console.log(req.headers['authorization']+' req.headers[authorization]',req.headers+ ' req.headers',)

    // Checking if the authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: false,
            message: `Acesso negado!`  // Access denied message
        });
    }

    try {
        // Extracting the token from the authorization header
        const token = authHeader.split(' ')[1];

        // Retrieving the secret key from environment variables
        let secret = process.env.SECRET_KEY;

        // Verifying the JWT token
        jwt.verify(token, secret);

        // If verification is successful, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If an error occurs during token verification, return a 400 status with the error message
        res.status(400).json({
            status: false,
            message: error.message  // Error message from token verification
        });
    }
};
