import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("jwt is not defined");
}
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }
        const decode = jwt.verify(token, JWT_SECRET);
        req.userId = decode.userId;
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Invalid token"
        });
    }
};
