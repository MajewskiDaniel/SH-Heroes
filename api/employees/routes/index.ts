import { Request, Response } from "express";
import { EmployeesService } from "../services";

const express = require("express");
const router = express.Router();
const employeesService = new EmployeesService();

router.get("/", async (req: Request, res: Response) => {
  try {
    const employees = await employeesService.getEmployees(req.params);
    res.status(200).send(employees);
  } catch {
    res.status(404).send(`error: can't get employees`);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const employee = await employeesService.getEmployeeById(id);
    res.status(200).send(employee);
  } catch {
    res.status(404).send(`error: can't get employee nr: ${id}`);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const employee = await employeesService.addEmployee(req.body);
    res.status(201).send(employee);
  } catch (e) {
    if (e.message === "occurred") {
      res.status(409).send("error: user already exists");
    } else {
      res.status(418).send(`error: can't post user`);
    }
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await employeesService.editEmployee(id, req.body);
    res.status(200).send(`employee nr: ${id} updated`);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.patch("/:idE/skills/:idS", async (req: Request, res: Response) => {
  const { idE, idS } = req.params;
  const { skillLevel } = req.body;

  try {
    await employeesService.updateSkill(idE, idS, skillLevel);
    res
      .status(200)
      .send(`skill nr: ${idS} updated to ${skillLevel} in employee nr: ${idE}`);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await employeesService.deleteEmployee(id);
    res.status(200).send(`employee nr: ${id} deleted`);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export { router };
