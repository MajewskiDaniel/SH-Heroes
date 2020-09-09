import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Employee from "./models/employee.model";

// require("dotenv").config();
dotenv.config();

const app = express();
const PORT = process.env.PORT;

mongoose.connect(`${process.env.MONGODB_CONNECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(express.json());

app.get("/", (req: any, res: any) => res.send("Express + TypeScript Server"));

//post employee
app.post("/employees/", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch {
    res.status(418).send(`error: can't post user`);
  }
});

//get all employees
app.get("/employees/", async (req, res) => {
  try {
    const employees = await Employee.find(req.query);
    res.status(200).send(employees);
  } catch {
    res.status(404).send(`error: can't get employees`);
  }
});

//delete employee by id
app.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).send(`employee nr: ${id} deleted`);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at port: ${PORT}`);
});
