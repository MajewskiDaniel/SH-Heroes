import React, {PropsWithChildren} from 'react';
import {IEmployee, ISkill, SkillLevel} from '../../models/employee';

import { TableNameField } from '../TableNameField/TableNameField';
import { Circle } from "../Circle/Circle";

import styles from './TableRow.module.scss'

export interface ITableRowProps {
  employee: IEmployee,
  skills: ISkill[]
}

export const TableRow: React.FC<PropsWithChildren<ITableRowProps>> = ({employee, skills }) => {
  return (
    <tr className={styles.Row}>
      <th className={styles.User}><TableNameField firstName={employee.firstName} lastName={employee.lastName} avatar={employee.photo} /></th>
      {
        skills?.map(({skillName}) => {
          const occurred = employee.skills?.find( ({skill}) => skill.skillName === skillName );
          const level = occurred?.skillLevel || SkillLevel.ZERO;
          return <td className={styles.Cell}><Circle level={level} /></td>
        })
      }
    </tr>
  );
}

