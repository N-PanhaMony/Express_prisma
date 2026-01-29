import jwt from 'jsonwebtoken';           // Import JWT library to verify tokens
import { prisma } from '../config/prisma.js'; // Import Prisma client to query the database

export const authMiddleware = async (req, res, next) => {
    console.log("Auth middleware triggered"); // Debug: middleware ran

    let token; // Variable to store the JWT

    // 1️⃣ Check if token exists in Authorization header
    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]; // Extract token from 'Bearer <token>'
    } 
    // 2️⃣ Otherwise, check if token exists in cookies
    else if (req.cookies && req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    // 3️⃣ If no token, block access
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // 4️⃣ Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        // decoded usually has { id: userId, iat: timestamp }

        // 5️⃣ Check if user exists in the database
        const user = await prisma.user.findUnique({
            where: { id: decoded.id }, // Find user by ID from token
        });

        // 6️⃣ If user not found (maybe deleted), block access
        if (!user) {
            return res.status(401).json({ message: 'User not found, authorization denied' });
        }

        // 7️⃣ Attach user info to request object
        req.user = user; 
        // Now all downstream routes can access req.user to know who is logged in

        // 8️⃣ Allow request to continue to the next middleware / controller
        next();
    } catch (error) {
        // 9️⃣ If token is invalid or expired
        return res.status(401).json({ message: 'Invalid token' });
    }
};
