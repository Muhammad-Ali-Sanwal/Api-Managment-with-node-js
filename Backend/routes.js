import express from "express";
import { Person } from "./schema.js";

export const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newStudent = new Person({
      name: req.body.name,
      age: req.body.age,
      fatherName: req.body.fatherName,
      CGPA: req.body.CGPA,
      salary: req.body.salary,
      passingYear: req.body.passingYear,
    });
    const Student = await newStudent.save();
    res.status(201).json(Student);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      res.status(400).json({ errors });
      console.error("Validation Error:", errors);
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

router.get("/", async (req, res) => {
  const AllStudents = await Person.find();
  res.send(AllStudents);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const DeletedStudent = await Person.findByIdAndDelete(id);
  if (DeletedStudent)
    return res.send(`Student with ID ${id} deleted successfully`);
  if (!DeletedStudent) return res.send(`Student with ID ${id} Not found`);
  res.send(DeletedStudent);
});
