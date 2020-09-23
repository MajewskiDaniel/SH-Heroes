import React, { PropsWithChildren } from "react";
import { Dropdown, Checkbox, Menu } from "antd";
import {
  IEmployee,
  ISkill,
  SkillLevel,
  IEmployeeSkill,
} from "../../models/employee";
import { ISkillMatirxEmployee } from "../SkillMatrixTable/SkillMatrixTable";
import { EmployeeFetch } from "../../services/EmployeeFetch";
import { TableNameField } from "../TableNameField/TableNameField";
import { Circle } from "../Circle/Circle";

import styles from "./TableRow.module.scss";
import classNames from "classnames";

export interface ITableRowProps {
  employee: ISkillMatirxEmployee;
  skills: ISkill[];
  reload: () => void;
  toggleEnable: (id: string) => void
}

export const TableRow: React.FC<PropsWithChildren<ITableRowProps>> = ({
  employee,
  skills,
  reload,
  toggleEnable
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

  const menu = (
    <Menu>
      <Menu.Item>
      <Checkbox onChange={()=>toggleEnable(employee._id!)} checked={employee.disable}>Disable</Checkbox>
      </Menu.Item>
    </Menu>

  );

  return (
    <tr className={classNames(styles.Row, employee.disable && styles.Disabled)}>
      <Dropdown overlay={menu} placement="topLeft" trigger={['hover']}>
        <th className={styles.User}>
          <TableNameField
            firstName={employee.firstName}
            lastName={employee.lastName}
            avatar={employee.photo}
          />
        </th>
      </Dropdown>
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
