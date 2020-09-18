import React, {PropsWithChildren} from 'react';
import {IEmployee, ISkill, SkillLevel} from '../../models/employee';

import {TableNameField} from '../TableNameField/TableNameField';
import {Circle} from "../Circle/Circle";

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
        skills && skills.map(( skill) => {
          const occurred = Array.isArray(employee.skills) ? employee.skills.findIndex( s => s.skill.skillName === skill.skillName ) : -1;
          if(occurred !== -1 && Array.isArray(employee.skills)) {
            return <td className={styles.Cell}><Circle level={employee.skills[occurred].skillLevel} /></td>
          } else {
            return <td className={styles.Cell}><Circle level={SkillLevel.ZERO} /></td>
          }
        })
      }
    </tr>
  );
}

