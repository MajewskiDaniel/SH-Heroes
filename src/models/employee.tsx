export interface IEmployee {
  firstname: string;
  lastName: string;
  startingYear: string;
  evaluationDate?: string;
  projectName?: string;
  tags?: string[];
  level: EmployeeLevel;
  position: string;
  photo?: string;
}

export enum EmployeeLevel {
  Junior = "junior",
  Mid = "mid",
  Senior = "senior",
}
