import {Schema, Document, Model} from "mongoose";
import {ISkill} from "../../skills/models";

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

// extend schema by 'required'
export const employeeSchema: Schema = new Schema({
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

export interface IEmployeeDB extends Document, IEmployee {}

export interface IEmployeeService {
  Employee: Model<IEmployeeDB>,
  getEmployees: (params: any) => Promise<IEmployeeDB[] | null>,
  getEmployeeById: (id: string) =>  Promise<IEmployeeDB | null>,
  addEmployee: (employee: IEmployee) =>  Promise<IEmployeeDB | null>,
  editEmployee: (id: string, employee: IEmployee) =>  Promise<IEmployeeDB | null>,
  deleteEmployee: (id: string) =>  Promise<IEmployeeDB | null>
}
