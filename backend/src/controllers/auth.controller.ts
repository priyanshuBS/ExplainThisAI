import { Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/auth.service.js";

const isProduction = process.env.NODE_ENV === "production";

export const RegisterUser = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email or password is required"
            })
        }

        const result = await registerUserService(email, password, name);

        res.cookie("auth_token", result.token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result.user
        })
    } catch (error) {
        console.log("Error in register user");

        return res.status(500).json({
            success: false,
            message: "Server error!"
        })
    }
}

export const LoginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email or password is missing"
            })
        }

        const result = await loginUserService(email, password);

       res.cookie("auth_token", result.token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
       })

        return res.status(200).json({
            success: true,
            message: "User login successfully",
            data: result.user
        })
    } catch (error) {
        console.log("Error in login controller");

        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}

export const LogoutUser = async (req: Request, res: Response) => {
    try {
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });

        return res.status(200).json({
            success: true,
            message: "Logout user successfully!"
        })
    } catch (error) {
        console.log("Error in logout controller");

        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}
