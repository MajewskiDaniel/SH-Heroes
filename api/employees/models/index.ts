import mongoose, { Schema, Document, Model } from "mongoose";

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
  skills?: IEmployeeSkill[];
}

export interface IEmployeeSkill {
  skill: string;
  skillLevel: SkillLevel;
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

export enum SkillLevel {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
}

export const employeeSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  startingYear: {
    type: String,
    required: true,
  },
  lastEvaluationDate: {
    type: String,
    required: false,
  },
  projectName: String,
  tags: [String],
  level: {
    type: Number,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  skills: [
    {
      skill: { type: mongoose.Schema.Types.ObjectId, ref: "skills" },
      skillLevel: Number,
    },
  ],
});

export interface IEmployeeDB extends Document, IEmployee {}

export interface IEmployeeService {
  Employee: Model<IEmployeeDB>;
  getEmployees: (params: any) => Promise<IEmployeeDB[] | null>;
  getEmployeeById: (id: string) => Promise<IEmployeeDB | null>;
  addEmployee: (employee: IEmployee) => Promise<IEmployeeDB | null>;
  editEmployee: (
    id: string,
    employee: IEmployee
  ) => Promise<IEmployeeDB | null>;
  deleteEmployee: (id: string) => Promise<IEmployeeDB | null>;
}
