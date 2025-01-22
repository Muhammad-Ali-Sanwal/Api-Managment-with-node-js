import { Schema, model } from "mongoose";
import { formatTimestamps } from "./timeStamp.js";
const SignUpSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
SignUpSchema.plugin(formatTimestamps);
export const Customer = model("customer", SignUpSchema);
