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
  skills?: ISkill[];
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

export interface ISkill {
  skillName: string;
  skillCategory: string;
  skillWeight: SkillWeight;
}

export enum SkillWeight {
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

// extend schema by 'required'
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

const skillSchema: Schema = new Schema({
  skillName: String,
  skillCategory: String,
  skillWeight: Number,
});

interface IEmployeeDB extends Document, IEmployee {}

interface ISkillDB extends Document, ISkill {}

export const Employee = mongoose.model<IEmployeeDB>("Employee", employeeSchema);
export const Skill = mongoose.model<ISkillDB>("Skill", skillSchema);
