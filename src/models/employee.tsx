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

export enum SeniorityLevel {
  JUNIOR = "junior",
  MID = "mid",
  SENIOR = "senior",
}

export enum EmployeePosition {
  SOFTWARE_DEV = "software developer",
  PROJECT_MANAGER = "project manager",
  TESTER = "tester",
  GRAPHIC_DESIGNER = "graphic designer",
}
