import React, {useEffect, useState} from "react";

import { TableHeader } from "../TableHeader/TableHeader";
import { RowDisplayTotal } from "../RowDisplayTotal/RowDisplayTotal";
import { TableRow } from "../TableRow/TableRow";

import styles from "./SkillMatrixTable.module.scss";
import { IEmployee, ISkill } from "../../models/employee";
import { Skills } from "../../services/SkillFetch";
import { EmployeeFetch } from  "../../services/EmployeeFetch";
import {allSkillsInCategory, skillsInCategory} from "../../services/Utils";

export interface ISkillMatrixTable {

}

export const SkillMatrixTable: React.FC<ISkillMatrixTable> = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [oldSkills, setOldSkills] = useState<ISkill[]>([]);

  const fetchEmployees = async () => {
    try {
      const data = await EmployeeFetch.getEmployee();
      setEmployees(data);
    } catch (e) {
      console.log(e);
    }
  }

  const fetchSkills = async () => {
    try {
      const data = await Skills.getSkills();
      setSkills(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchEmployees();

    (async () => {
      try {
        const skillData = await Skills.getSkills();

        const catData = await Skills.getCategories();

        const sorted = catData?.reduce((acc: ISkill[], cat: string) => {
          return [...acc, ...allSkillsInCategory(cat, skillData.skills)];
        }, []);

        setOldSkills(skillData.skills)
        setSkills(sorted);
      } catch (e) {
        console.log(e)
      }
    })();
  },[]);

  return (
    <table className={styles.Table}>
      <TableHeader skills={oldSkills} ></TableHeader>
      <tbody>
        <RowDisplayTotal employees={employees} skills={skills} ></RowDisplayTotal>
        { employees?.map( (employee) => (
          <TableRow employee={employee} skills={skills} ></TableRow>
        ))}
      </tbody>
    </table>
  )
}
