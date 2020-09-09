import mongoose, { Schema, Document } from "mongoose";
// import { IEmployee } from "../../src/models/employee";

export interface IEmployee {
  firstName: string;
  lastName: string;
  startingYear: string;
  lastEvaluationDate?: string;
  projectName?: string;
  tags?: string[];
  level: SeniorityLevel;
  position: EmployeePosition;
  photo: string;
}

export enum EmployeePosition {
  SOFTWARE_DEV,
  PROJECT_MANAGER,
  TESTER,
  GRAPHIC_DESIGNER,
}

export enum SeniorityLevel {
  JUNIOR,
  MID,
  SENIOR,
  TECH_LEAD,
}

const employeeSchema: Schema = new Schema({
  firstName: String,
  lastName: String,
  startingYear: String,
  lastEvaluationDate: String,
  projectName: String,
  tags: [String],
  level: Number,
  position: Number,
  photo: String,
});

interface IEmployeeDB extends Document, IEmployee {}

export default mongoose.model<IEmployeeDB>("employee", employeeSchema);
