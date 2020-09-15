export interface IEmployee {
  _id?: string;
  firstName: string;
  lastName: string;
  startingYear: string;
  lastEvaluationDate?: string;
  projectName?: string;
  tags?: string[];
  level: SeniorityLevel;
  position: EmployeePosition;
  photo: string;
  skills?: [{ skill: ISkill; skillLevel: SkillLevel }];
}

export interface ISkill {
  _id?: string;
  skillName: string;
  skillCategory: string;
  skillWeight: SkillWeight;
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

export enum SkillWeight {
  "1/5",
  "2/5",
  "3/5",
  "4/5",
  "5/5",
}

export enum SkillLevel {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

export const seniorityMap = new Map()
  .set(SeniorityLevel.JUNIOR, "Junior")
  .set(SeniorityLevel.MID, "Mid")
  .set(SeniorityLevel.SENIOR, "Senior")
  .set(SeniorityLevel.TECH_LEAD, "Tech Lead");

export const employeePositionMap = new Map()
  .set(EmployeePosition.SOFTWARE_DEV, "Software developer")
  .set(EmployeePosition.PROJECT_MANAGER, "Project manager")
  .set(EmployeePosition.TESTER, "Tester")
  .set(EmployeePosition.GRAPHIC_DESIGNER, "Graphic designer");

export const skillWeightMap = new Map()
  .set(SkillWeight["1/5"], "1/5")
  .set(SkillWeight["2/5"], "2/5")
  .set(SkillWeight["3/5"], "3/5")
  .set(SkillWeight["4/5"], "4/5")
  .set(SkillWeight["5/5"], "5/5")

export const skillLevelMap = new Map()
  .set(SkillLevel.ZERO, "ZERO")
  .set(SkillLevel.ONE, "ONE")
  .set(SkillLevel.TWO, "TWO")
  .set(SkillLevel.THREE, "THREE")
  .set(SkillLevel.FOUR, "FOUR")
  .set(SkillLevel.FIVE, "FIVE")

