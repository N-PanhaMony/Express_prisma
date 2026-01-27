import jwt from 'jsonwebtoken'

// Function to generate JWT token for a user
export const generateToken = (userId, res) => {
    // Create payload with user ID
    const payload = { id: userId }

    // Sign the JWT token with secret and expiration (7 days)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })

    // Set the token as a cookie in the response
    // Note: res object should be available in the calling context
    res.cookie('token', token, {
        httpOnly: true, // prevents client-side JS from accessing cookie
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'strict', // prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    })

    // Return the token string (useful for sending in response body)
    return token
}
