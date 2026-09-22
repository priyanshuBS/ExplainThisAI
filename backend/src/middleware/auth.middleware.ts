import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("jwt is not defined")
}

interface JwtPayload {
    userId: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.auth_token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            })
        }

        const decode = jwt.verify(
            token,
            JWT_SECRET
        ) as JwtPayload;

        req.userId = decode.userId;

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Invalid token"
        })
    }
}
