import express from "express";
import { Customer } from "./schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const routerLogin = express.Router();

routerLogin.post("/", async (req, res) => {
  const user = await Customer.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is wrong");
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password is wrong");

  res.status(200).send({ name: user.username });
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.PRIVATE_KEY,
    { expiresIn: "1h" }
  );
  res.status(200).json({ token, name: user.username });
});
