import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

import {router as employees} from "./employees/routes";
import {router as skills} from "./skills/routes";

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

  app.use('/employees', employees);
  app.use('/skills', skills);
}

run();

app.listen(PORT, () => {
  console.log(`[server]: Server is running at port: ${PORT}`);
});
