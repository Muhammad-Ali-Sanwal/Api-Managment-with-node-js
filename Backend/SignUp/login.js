import express from "express";
import { Customer } from "./schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const routerLogin = express.Router();

routerLogin.post("/", async (req, res) => {
  try {
    const user = await Customer.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Email" });
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).json({ error: "Incorrect Password" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.PRIVATE_KEY,
      { expiresIn: "1m" }
    );
    res.status(200).json({ token, name: user.username });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
