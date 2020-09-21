import React, { useState, useEffect } from "react";
import styles from "./TableHeader.module.scss";
import { ISkill } from "../../models/employee";
import { SkillSvc } from "../../services/EmployeesSvc";

export const TableHeader: React.FC<{ skills: ISkill[] }> = ({ skills }) => {
  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
    try {
      const categories: string[] = await SkillSvc.getCategories();
      setCategories(categories);
    } catch (e) {
      console.log("::TableHeader::fetchCategories::error::", e.message);
    }
  };

  const cellWidth = 40;

  function skillsInCategory(category: string, skills: ISkill[]): string[] {
    let skillsTable: string[] = [];
    skills.forEach((skill) => {
      if (skill.skillCategory === category) skillsTable.push(skill.skillName);
    });
    skillsTable = skillsTable.sort();
    return skillsTable;
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <thead className={styles.tableHeader}>
      <tr className={styles.skillCategoriesRow}>
        <td className={styles.pieChart}></td>
        {categories.map((category) => (
          <th
            className={styles.skillCategory}
            colSpan={skillsInCategory(category, skills).length}
            style={{
              width: `${
                skillsInCategory(category, skills).length * cellWidth
              }px`,
            }}
          >
            {category}
          </th>
        ))}
      </tr>
      <tr className={styles.skillNames}>
        <td className={styles.pieChart}></td>
        {categories.map((category) =>
          skillsInCategory(category, skills).map((skill) => (
            <th className={styles.skillName}>
              <span>{skill}</span>
            </th>
          ))
        )}
      </tr>
    </thead>
  );
};
