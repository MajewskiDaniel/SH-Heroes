import mongoose from "mongoose";
// const Schema = mongoose.Schema

module.exports = mongoose.model("employee", {
  firstName: String,
  lastName: String,
  startingYear: String,
  lastEvaluationDate: String,
  projectName: String,
  tags: [String],
  level: String,
  position: String,
  photo: String,
});
