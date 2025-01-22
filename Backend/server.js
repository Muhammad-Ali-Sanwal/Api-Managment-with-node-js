import express from "express";
import cors from "cors";
import { ConnectDB } from "./connection.js";
import { SignupRouter } from "../Backend/SignUp/action.js";
import { routerLogin } from "../Backend/SignUp/login.js";
// import { router } from "./routes.js";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.PRIVATE_KEY) {
  console.error("FATAL ERROR: PRIVATE_KEY is not defined.");
  process.exit(1);
}
console.log("PRIVATE_KEY is: ", process.env.PRIVATE_KEY);
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

ConnectDB();

app.use("/api/signup", SignupRouter);
app.use("/api/login", routerLogin);
app.get("/", (req, res) => {
  res.send("Welcome to the SignUp API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
