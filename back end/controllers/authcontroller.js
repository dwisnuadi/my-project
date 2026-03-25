import db from "../config/db.js";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../models/userModel.js";

// REGISTER
export const register = async (req, res) => {
   console.log("REQ BODY:", req.body);
  try {
    if (!req.body) return res.status(400).json({ error: "Body required" });

    const { full_name, email, phone, password } = req.body;

    if (!full_name || !email || !phone || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db("users").insert({
      full_name,
      email,
      phone,
      password: hashedPassword,
    });

    return res.json({ message: "Register success" });
  } catch (err) {
    console.log("ERROR REGISTER:", err);
    return res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await findUserByEmail(email);
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const { password: _, ...safeUser } = user;
    return res.json(safeUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};