import jwt from "jsonwebtoken";

export const verifyAuth = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ message: "Invalid token" });
    }
};
