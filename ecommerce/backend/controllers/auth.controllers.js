import db from '../lib/db.js';
// users table schema import
import {users} from "../lib/ormSchema.js";

export const signup = async (req, res) => {
    const {email, password, firstName, lastName, gender, phoneNumber} = req.body;
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
            email, firstName, lastName, gender, phoneNumber, password
        })
        res.status(200).json({message: "user created successfully"})
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