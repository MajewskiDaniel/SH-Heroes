import  { useMemo } from 'react';
import { ISkillMatirxEmployee, ISortOptions } from "../components/SkillMatrixTable/SkillMatrixTable";
import moment from "moment";
import { sortEmployees } from "../components/SkillMatrixTable/SkillMatrixTable";

export const useFilter = (employees: ISkillMatirxEmployee[], filters: ISortOptions): [ISkillMatirxEmployee[]] => {

  const filtered = useMemo(() => {
    let results = [...employees];
    if (filters.skills.length > 0) {
      const elem = filters.skills.map((sortOptionSkill) =>
        results.filter((empl) =>
          empl.skills?.find((skill) => skill.skill === sortOptionSkill && skill.skillLevel > 0)
        )
      );
      results = Array.from(new Set(elem.flat()));
    }
    if (filters.experience) {
      results = results.filter((empl) => {
        const start = moment(empl.startingYear);
        const experience = moment().diff(start, "year");
        return filters.experience[0] <= experience && experience < filters.experience[1];
      });
    }
    if (filters.seniorityLevel || filters.seniorityLevel === 0) {
      results = results.filter((empl) => empl.level === filters.seniorityLevel);
    }
    if (filters.tags.length > 0) {
      const elem = filters.tags.map((sortOptionTag) =>
        results.filter((empl) =>
          empl.tags?.find((tag) => tag === sortOptionTag)
        )
      );
      results = Array.from(new Set(elem.flat()));
    }
    sortEmployees(results)
    return results;
  }, [employees, filters]);

  return [filtered];
}
