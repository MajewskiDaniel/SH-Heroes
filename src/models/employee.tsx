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
  SOFTWARE_DEV = "Software developer",
  PROJECT_MANAGER = "Project manager",
  TESTER = "Tester",
  GRAPHIC_DESIGNER = "Graphic designer"
}

export enum SeniorityLevel {
  JUNIOR = "Junior",
  MID = "Mid",
  SENIOR = "Senior",
  TECH_LEAD = "Tech Lead",
}

// w modelach możemy zrobić mapę

export const seniorityMap = {
  [SeniorityLevel.JUNIOR]: "Junior",
  [SeniorityLevel.MID]: "Mid",
  [SeniorityLevel.SENIOR]: "Senior",
  [SeniorityLevel.TECH_LEAD]: "Tech Lead",
};

export const employeePositionMap = {
  [EmployeePosition.SOFTWARE_DEV]: "Software developer",
  [EmployeePosition.PROJECT_MANAGER]: "Project manager",
  [EmployeePosition.TESTER]: "Tester",
  [EmployeePosition.GRAPHIC_DESIGNER]: "Graphic designer"
}
