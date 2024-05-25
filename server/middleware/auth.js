import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).json({ message: "User not authenticated" });
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();

    } catch (error) {
        res.status(500).json({ message: "Token is not valid" });
    }
}