import {ISkill} from "../models/employee";

export const checkForError = (response: any) => {
  if (!response.ok) throw Error(response.statusText);
}

export const skillsInCategory = (category: string, skills: ISkill[]): string[] => {
  let skillsTable: string[] = [];
  skills?.forEach((skill) => {
    if (skill.skillCategory === category) skillsTable.push(skill.skillName);
  });
  skillsTable = skillsTable.sort();
  return skillsTable;
}

export const allSkillsInCategory = (category: string, skills: ISkill[]): ISkill[] => {
  let skillsTable: ISkill[] = [];
  skills?.forEach((skill) => {
    if (skill.skillCategory === category) skillsTable.push(skill);
  });
  skillsTable = skillsTable.sort();
  return skillsTable;
}
