import React, { useState, useEffect } from "react";
import styles from "./TableHeader.module.scss";
import { ISkill } from "../../models/employee";
import { Skills } from "../../services/SkillFetch";
import { skillsInCategory } from "../../services/Utils";
import { ResponsivePie } from "@nivo/pie";
import { Pie } from "@nivo/pie";

export const TableHeader: React.FC<{ skills: ISkill[] }> = ({ skills }) => {
  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
    try {
      const categories: string[] = await Skills.getCategories();
      setCategories(categories);
    } catch (e) {
      console.log("::TableHeader::fetchCategories::error::", e.message);
    }
  };

  const cellWidth = 40;

  const pieData = [
    {
      id: "matched",
      value: 86,
      color: "goldenrod",
    },
    {
      id: "not matched",
      value: 14,
      color: "lightgrey",
    },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <thead className={styles.tableHeader}>
      <tr className={styles.skillCategoriesRow}>
        <th className={styles.pieChart} rowSpan={2}>
          <div className={styles.pieContainer}>
            <Pie
              data={pieData}
              width={180}
              height={180}
              innerRadius={0.6}
              padAngle={1}
              cornerRadius={5}
              enableRadialLabels={false}
              enableSlicesLabels={false}
              colors={[pieData[0].color, pieData[1].color]}
            />
            <div className={styles.pieDescription}>
              Coverage <br />
              <span className={styles.piePercentage}>{pieData[0].value}%</span>
            </div>
          </div>
        </th>
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
