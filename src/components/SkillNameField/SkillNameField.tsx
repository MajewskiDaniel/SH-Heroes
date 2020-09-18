import React from "react";
import styles from "./SkillNameField.module.scss";
import { ISkill } from "../../models/employee";

export interface ISkillName {
  skillName: Partial<ISkill>;
}

export const SkillNameField: React.FC<ISkillName> = ({ skillName }) => {
  return <span className={styles.skillName}>{skillName}</span>;
};
