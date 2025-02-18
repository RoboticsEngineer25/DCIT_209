import db from '../lib/db.js';
// users table schema import
import { users, authentication } from "../lib/ormSchema.js";
import { eq } from "drizzle-orm";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret';

export const signup = async (req, res) => {
    const { email, password, firstName, lastName, gender, phoneNumber, role } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
        if (!email || !password || !firstName || !gender || !phoneNumber) {
            return res.status(400).json({ message: "All fields must be filled" });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).send({ message: "Invalid email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.insert(users).values({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            gender,
            phoneNumber,
            role
        });

        const user = await db
            .select({ userId: users.userId })
            .from(users)
            .where(eq(users.email, email));

        res.cookie("user_id", user[0].userId, { httpOnly: true });
        res.status(200).json({ message: "User created successfully", info: user[0].userId });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await db
            .select({
                userId: users.userId,
                password: users.password,
                role: users.role
            })
            .from(users)
            .where(eq(users.email, email));

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user[0].userId, role: user[0].role }, SECRET_KEY, { expiresIn: '1h' });

        res.cookie("auth_token", token, { httpOnly:true,sameSite:"Lax" });
        res.status(200).json({ message: "Login successful", token,user:user[0].userId });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("auth_token");
        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

