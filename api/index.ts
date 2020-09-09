// const express = require("express");

import express from "express";

const app = express();

const PORT = 4040;

app.get("/", (req: any, res: any) => res.send("Express + TypeScript Server"));

app.listen(PORT, () => {
  console.log(`[server]: Server is running at port: ${PORT}`);
});
