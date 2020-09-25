import { useMemo } from "react";
import {
  IDynamic,
  ISkillMatirxEmployee,
} from "../components/SkillMatrixTable/SkillMatrixTable";
import { ISkill } from "../models/employee";

export const useCountSkills = (
  skills: ISkill[],
  employees: ISkillMatirxEmployee[],
  filtered: ISkillMatirxEmployee[]
): {
  totalEmployees: IDynamic;
  totalSkillLevel: IDynamic;
  employeesCoverage: number;
} => {
  const useCountSkills = useMemo(() => {
    const totalHelper: IDynamic = {};
    const totalSkillLevelHelper: IDynamic = {};

    skills?.forEach((skill) => {
      if (skill._id) {
        totalHelper[skill._id] = 0;
        totalSkillLevelHelper[skill._id] = 0;
      }
    });

    filtered?.forEach((empl) => {
      empl.skills?.forEach(({ skill, skillLevel }) => {
        const actual = skills.find((s) => s._id === skill);
        if (actual && !empl.disable) {
          totalSkillLevelHelper[skill] += skillLevel;
          if (skillLevel >= 1) {
            totalHelper[skill] += 1;
          }
        }
      });
    });
    const employeesCount = employees.length;
    return {
      totalEmployees: totalHelper,
      totalSkillLevel: totalSkillLevelHelper,
      employeesCoverage: employeesCount,
    };
  }, [skills, filtered]);

  return useCountSkills;
};
