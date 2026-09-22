import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("jwt is not defined")
}

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const registerUserService = async (
    email: string,
    password: string,
    name?: string
) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new Error("User already exists with provided email");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    });

    const token = jwt.sign(
        { userId: user.id },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] }
    );

    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        },
        token
    }
}

export const loginUserService = async (
    email: string,
    password: string
) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("User is not registered with given email")
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error("Password doesn't match with given email")
    }

    const token = jwt.sign(
        { userId: user.id },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] }
    );

    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        },
        token
    }
}
