import db from '../lib/db.js';
// users table schema import
import {users} from "../lib/ormSchema.js";
import {eq} from "drizzle-orm"
export const signup = async (req, res) => {
    const {email, password, firstName, lastName, gender, phoneNumber,role} = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {

        console.log(req.body)
        if (!email || !password || !firstName || !gender || !phoneNumber) {

            return res.status(400).json({message: "all fields must be filled"})
        }
// inserting into the database
        if (!emailRegex.test(email)) {
            return res.status(400).send({message: "invalid email"})
        }
        await db.insert(users).values({
            email, firstName, lastName, gender, phoneNumber, password,role
        })


        const user_id = await db
            .select({ userId: users.userId })
            .from(users)
            .where(eq(users.email, email));


        res.cookie("user_id",user_id[0].userId)
        console.log(req.cookies.user_id)
        res.status(200).json({message: "user created successfully",info:user_id[0].userId})

    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: "internal server error",error:err.message})
    }
}
export const login = async (req, res) => {
    res.send("login")
}
export const logout = async (req, res) => {
    res.send("logout")
}