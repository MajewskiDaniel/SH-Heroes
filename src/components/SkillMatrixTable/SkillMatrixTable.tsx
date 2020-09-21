import React, {useEffect, useState} from "react";

import { TableHeader } from "../TableHeader/TableHeader";
import { RowDisplayTotal } from "../RowDisplayTotal/RowDisplayTotal";
import { TableRow } from "../TableRow/TableRow";

import styles from "./SkillMatrixTable.module.scss";
import {IEmployee, ISkill, ISkillPaginated} from "../../models/employee";
import { EmployeesSvc, SkillSvc } from "../../services/EmployeesSvc";

export interface ISkillMatrixTable {

}

export const SkillMatrixTable: React.FC<ISkillMatrixTable> = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [skills, setSkills] = useState<ISkillPaginated>({skills: [],
    totalRecords: 0,
    currentPage: 1
  });

  const fetchEmployees = async () => {
    try {
      const data = await EmployeesSvc.getEmployee();
      setEmployees(data);
    } catch (e) {
      console.log(e);
    }
  }

  const fetchSkills = async () => {
    try {
      const data = await SkillSvc.getSkills();
      setSkills(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchEmployees();
    fetchSkills();
  },[])

  return (
    <table className={styles.Table}>
      <TableHeader skills={skills?.skills} ></TableHeader>
      <tbody>
        <RowDisplayTotal employees={employees} skills={skills?.skills} ></RowDisplayTotal>
        { employees?.map( (employee) => (
          <TableRow employee={employee} skills={skills?.skills} ></TableRow>
        ))}
      </tbody>
    </table>
  )
}
