import express from "express";
import { Customer } from "./schema.js";
import bcrypt from "bcrypt";
import toast from "react-hot-toast";
import jwt from "jsonwebtoken";

export const SignupRouter = express.Router();

SignupRouter.post("/", async (req, res) => {
  try {
    const existingUser = await Customer.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const NewCustomer = new Customer({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });

    const salt = await bcrypt.genSalt(10);
    NewCustomer.password = await bcrypt.hash(NewCustomer.password, salt);

    await NewCustomer.save();

    const token = jwt.sign(
      {
        _id: NewCustomer._id,
        username: NewCustomer.username,
        email: NewCustomer.email,
        isAdmin: NewCustomer.isAdmin,
      },
      process.env.PRIVATE_KEY,
      { expiresIn: "1m" }
    );

    res.status(201).header("x-auth-token", token).json({
      message: "User registered successfully",
      token,
      user: NewCustomer,
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Something went wrong, please try again" });
  }
});
