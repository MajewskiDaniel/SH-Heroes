import React, {PropsWithChildren} from 'react';
import {IEmployee, ISkill} from '../../models/employee';
import {IDinamic} from "../RowDisplayTotal/RowDisplayTotal";

import styles from './TableFirstRow.module.scss';

export interface ITableFirstRowProps {
  skillMatch: IDinamic
}

export const TableFirstRow: React.FC<PropsWithChildren<ITableFirstRowProps>> = ({skillMatch , children}) => {
  return (
    <tr className={styles.Row}>
      <th className={styles.Title}>{children}</th>
      {
        Object.keys(skillMatch)?.map((skillValue) => {
          return <td className={styles.Cell}>{skillMatch[skillValue]}</td>
        })
      }
    </tr>
  );
}
