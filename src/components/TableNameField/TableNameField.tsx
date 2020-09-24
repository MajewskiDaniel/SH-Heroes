import React, { PropsWithChildren } from "react";
import styles from "./TableNameField.module.scss";
import classNames from "classnames";

export interface ITableNameFieldProps {
  firstName: string;
  lastName: string;
  avatar?: string;
  disable: boolean
}

export const TableNameField: React.FC<PropsWithChildren<
  ITableNameFieldProps
>> = ({ firstName, lastName, avatar, disable }) => {
  return (
    <div className={styles.tableNameField}>
      <div className={styles.avatar}>
        <img alt="" src={avatar} className={classNames(disable && styles.disable)} />
      </div>
      <div className={styles.name}>
        <span>
          {lastName}, {firstName}
        </span>
      </div>
    </div>
  );
};
