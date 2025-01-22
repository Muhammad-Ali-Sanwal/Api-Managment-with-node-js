import express from "express";
import { Customer } from "./schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const SignupRouter = express.Router();
SignupRouter.post("/", async (req, res) => {
  try {
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
      },
      process.env.PRIVATE_KEY,
      { expiresIn: "1h" }
    );
    res
      .status(201)
      .header("x-auth-token", token)
      .json({ token, user: NewCustomer });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

SignupRouter.get("/", async (req, res) => {
  const AllCustomers = await Customer.find();
  res.send(AllCustomers);
});

SignupRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const DeletedCustomer = await Customer.findByIdAndDelete(id);
  if (DeletedCustomer)
    return res.send(`Customer with ID ${id} deleted successfully`);
  if (!DeletedCustomer) return res.send(`Customer with ID ${id} Not found`);
  res.send(DeletedCustomer);
});
