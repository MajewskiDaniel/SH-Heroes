import React from "react";
import styles from "./SkillNameField.module.scss";

export const SkillNameField: React.FC<String> = (skillName) => {
  return <span className={styles.skillName}>{skillName}</span>;
};
