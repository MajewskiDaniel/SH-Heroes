import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { Employee, Skill, IEmployee, ISkill } from "./models/employee.model";

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

//post skill
app.post("/skills/", async (req: Request, res: Response) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).send(skill);
  } catch {
    res.status(418).send(`error: can't post skill`);
  }
});

//get all skills
app.get("/skills/", async (req: Request, res: Response) => {
  try {
    const skills: ISkill[] = await Skill.find(req.query);
    res.status(200).send(skills);
  } catch {
    res.status(404).send(`error: can't get skills`);
  }
});

//get skill by id
app.get("/skills/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const skill = await Skill.findById(id);
    res.status(200).send(skill);
  } catch {
    res.status(404).send(`error: can't get skill nr: ${id}`);
  }
});

//delete skill by id
app.delete("/skills/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Skill.findByIdAndDelete(id);
    res.status(200).send(`skill nr: ${id} deleted`);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//update skill by id
app.put("/skills/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Skill.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send(`skill nr: ${id} updated`);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at port: ${PORT}`);
});
