import { Schema, model } from "mongoose";

const MongooseSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "Name must between 3-100"],
    maxLength: [100, "Name must between 3-100"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [18, "Age must be at least 18"],
    max: [100, "Age must be under 100"],
  },
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
    minLength: [3, "Father Name must between 3-100"],
    maxLength: [100, "Father Name must between 3-100"],
    trim: true,
  },
  CGPA: {
    type: Number,
    required: [true, "CGPA is required"],
    min: [2, "CGPA must greater then 2"],
    max: [4, "CGPA cannot exceed 4.0"],
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
    min: [30000, "Salary must be at least 30,000"],
    max: [300000, "Salary cannot exceed 300,000"],
  },
  passingYear: {
    type: Number,
    required: [true, "Passing year is required"],
    min: [1947, "Passing year must be after 1947"],
    max: [
      new Date().getFullYear(),
      `Passing year cannot exceed ${new Date().getFullYear()}`,
    ],
  },
});

export const Person = model("person", MongooseSchema);
