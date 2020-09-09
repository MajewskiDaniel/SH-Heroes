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

// w modelach możemy zrobić mapę

export const enumMap = {
  [SeniorityLevel.JUNIOR]: "Junior",
  [SeniorityLevel.MID]: "Mid",
  [SeniorityLevel.SENIOR]: "Senior",
  [SeniorityLevel.TECH_LEAD]: "Tech Lead",
};
