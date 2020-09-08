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
  Junior = "junior",
  Mid = "mid",
  Senior = "senior",
}

export enum EmployeePosition {
  SoftwareDev = "software developer",
  ProjectManager = "project manager",
  Tester = "tester",
  GraphicDesigner = "graphic designer",
}
