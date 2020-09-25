import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { router as employees } from "./employees/routes";
import { router as skills } from "./skills/routes";
import { router as login } from "./login/routes";

import { LoginService } from "./login/services";
import {IToken} from "./login/models";

const loginService = new LoginService();

dotenv.config();

const app = express();
const PORT = process.env.PORT;

function run() {
  if (!process.env.MONGODB_CONNECTION) {
    console.error("no mongo db config");
    return;
  }

  mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  app.use(express.json());
  app.use(cors());

  app.use(["/employees", "/skills"], async (req: Request, res: Response, next) => {
    try{
      const token = (req.headers.authorization || '').split(' ')[1];
      if (token) {
        const authorized: IToken | null = await loginService.getToken(token);
        if(token === authorized?.token) {
          return next();
        }
      }
      throw new Error("not authorized");
    } catch (e) {
      res.status(401).send("Not authorized");
    }
  });

  app.use("/employees", employees);
  app.use("/skills", skills);
  app.use("/login", login);
}

run();

app.listen(PORT, () => {
  console.log(`[server]: Server is running at port: ${PORT}`);
});
