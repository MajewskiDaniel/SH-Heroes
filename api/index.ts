import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Employee, { IEmployee } from "./models/employee.model";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

mongoose.connect(`${process.env.MONGODB_CONNECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) =>
  res.send("Express + TypeScript Server")
);

//post employee
app.post("/employees/", async (req: Request, res: Response) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch {
    res.status(418).send(`error: can't post user`);
  }
});

//get all employees
app.get("/employees/", async (req: Request, res: Response) => {
  try {
    const employees: IEmployee[] = await Employee.find(req.query);
    res.status(200).send(employees);
  } catch {
    res.status(404).send(`error: can't get employees`);
  }
});

//get employee by id
app.get("/employees/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    res.status(200).send(employee);
  } catch {
    res.status(404).send(`error: can't get employee nr: ${id}`);
  }
});

//delete employee by id
app.delete("/employees/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).send(`employee nr: ${id} deleted`);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//update employee by id
app.put("/employees/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send(`employee nr: ${id} updated`);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at port: ${PORT}`);
});
