import React, { useState, useEffect } from "react";
import styles from "./TableHeader.module.scss";
import { ISkill } from "../../models/employee";
import { Skills } from "../../services/SkillFetch";
import { skillsInCategory } from "../../services/Utils";
import { Pie } from "@nivo/pie";
import { IDynamic } from "../SkillMatrixTable/SkillMatrixTable";

export const TableHeader: React.FC<{
  skills: ISkill[];
  totalSkillLevel: IDynamic;
  employeesCoverage: number;
}> = ({ skills, totalSkillLevel, employeesCoverage }) => {
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

  const totalCoverage = (totalSkillLevel: IDynamic) => {
    let coverageArr: number[] = [];
    for (const skillLevel in totalSkillLevel) {
      coverageArr.push(totalSkillLevel[skillLevel]);
    }
    console.log("::TableHeader::coverageArray::", coverageArr);
    if (coverageArr.length !== 0) {
      return Math.round(
        (coverageArr.reduce((acc, currentVal) => acc + currentVal) /
          (coverageArr.length * 5 * employeesCoverage)) *
          100
      );
    } else return 0;
  };

  const pieData = [
    {
      id: "matched",
      value: totalCoverage(totalSkillLevel),
      color: "goldenrod",
    },
    {
      id: "not matched",
      value: 100 - totalCoverage(totalSkillLevel),
      color: "lightgrey",
    },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    totalCoverage(totalSkillLevel);
  }, [totalSkillLevel]);

  return (
    <thead className={styles.tableHeader}>
      <tr className={styles.skillCategoriesRow}>
        <th className={styles.pieChart} rowSpan={2}>
          <div className={styles.flexWrapper}>
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
                <span className={styles.piePercentage}>
                  {pieData[0].value}%
                </span>
              </div>
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
            <span>{category}</span>
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
