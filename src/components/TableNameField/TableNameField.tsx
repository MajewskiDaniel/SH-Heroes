import React, { PropsWithChildren } from "react";
import styles from "./TableNameField.module.scss";

export interface ITableNameFieldProps {
  firstName: string;
  lastName: string;
  avatar?: string;
}

export const TableNameField: React.FC<PropsWithChildren<
  ITableNameFieldProps
>> = ({ firstName, lastName, avatar }) => {
  return (
    <div className={styles.tableNameField}>
      <div className={styles.avatar}>
        <img alt="" src={avatar} />
      </div>
      <div className={styles.name}>
        <span>
          {lastName}, {firstName}
        </span>
      </div>
    </div>
  );
};
