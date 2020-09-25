import { Request, Response } from "express";
import { LoginService } from "../services";

const express = require("express");
const router = express.Router();
const loginService = new LoginService();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await loginService.getUsers();
    res.status(200).send(users);
  } catch {
    res.status(404).send(`error: can't get user`);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;
    const token = await loginService.authorize(login, password);
    // const employee = await loginService.addUser(req.body);
    res.status(200).send(token);
  } catch (e) {
    res.status(401).send("error: not autorized");
  }
});

router.get("/token", async (req: Request, res: Response) => {
  try {
    const tokens = await loginService.getTokens();
    res.status(200).send(tokens);
  } catch (e) {
    res.status(404).send("not found");
  }
});

export { router };
