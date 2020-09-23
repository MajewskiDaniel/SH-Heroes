import React, { PropsWithChildren } from "react";
import {
  IEmployee,
  ISkill,
  SkillLevel,
  IEmployeeSkill,
} from "../../models/employee";
import { EmployeeFetch } from "../../services/EmployeeFetch";
import { TableNameField } from "../TableNameField/TableNameField";
import { Circle } from "../Circle/Circle";

import styles from "./TableRow.module.scss";

export interface ITableRowProps {
  employee: IEmployee;
  skills: ISkill[];
  reload: () => {};
}

export const TableRow: React.FC<PropsWithChildren<ITableRowProps>> = ({
  employee,
  skills,
  reload,
}) => {
  const handleLevelClick = async (level: React.ReactText, skill: ISkill) => {
    const skillLevel: Partial<IEmployeeSkill> = {
      skillLevel: Number(level),
    };
    const employeeId = employee._id;
    const skillId = skill._id;
    await EmployeeFetch.editSkillLevel(employeeId, skillId, skillLevel);
    reload();
  };

  return (
    <tr className={styles.Row}>
      <th className={styles.User}>
        <TableNameField
          firstName={employee.firstName}
          lastName={employee.lastName}
          avatar={employee.photo}
        />
      </th>
      {skills?.map((allSkillsSkill) => {
        const occurred = employee.skills?.find(
          ({ skill }) => skill === allSkillsSkill._id
        );
        const level = occurred?.skillLevel || SkillLevel.ZERO;
        return (
          <td className={styles.Cell}>
            <Circle
              level={level}
              skill={allSkillsSkill}
              handleLevelClick={handleLevelClick}
            />
          </td>
        );
      })}
    </tr>
  );
};
