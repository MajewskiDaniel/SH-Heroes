import React, { PropsWithChildren } from "react";
import { IDynamic } from "../SkillMatrixTable/SkillMatrixTable";

import styles from "./TableFirstRow.module.scss";

export interface ITableFirstRowProps {
  skillMatch: IDynamic;
}

export const TableFirstRow: React.FC<PropsWithChildren<
  ITableFirstRowProps
>> = ({ skillMatch, children }) => {
  return (
    <tr className={styles.Row}>
      <th className={styles.Title}>
        <div className={styles.TitleCell}>{children}</div>{" "}
      </th>
      {Object.keys(skillMatch)?.map((skillValue) => {
        return (
          <td className={styles.Cell}>
            <div className={styles.Container}>{skillMatch[skillValue]}</div>
          </td>
        );
      })}
    </tr>
  );
};
