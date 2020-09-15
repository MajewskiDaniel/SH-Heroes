import React, { useState, useEffect } from "react";
import styles from "./SkillListPage.module.scss";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { SkillList } from "../../components/SkillList/SkillList";
import { ISkill, SkillWeight } from "../../models/employee";
import { SkillsSvc } from "../../services/EmployeesSvc";

// const skills: ISkill[] = [
//   {
//     skillName: "Word",
//     skillCategory: "Programming languages",
//     skillWeight: SkillWeight["3/5"],
//   },
//   {
//     skillName: "Excel",
//     skillCategory: "Programming languages",
//     skillWeight: SkillWeight["4/5"],
//   },
//   {
//     skillName: "Java",
//     skillCategory: "Programming languages",
//     skillWeight: SkillWeight["2/5"],
//   },
//   {
//     skillName: "Alcohol resistance",
//     skillCategory: "Soft skills",
//     skillWeight: SkillWeight["5/5"],
//   },
//   {
//     skillName: "Windows",
//     skillCategory: "Environment",
//     skillWeight: SkillWeight["4/5"],
//   },
//   {
//     skillName: "Linux",
//     skillCategory: "Environment",
//     skillWeight: SkillWeight["1/5"],
//   },
//   {
//     skillName: "Script",
//     skillCategory: "Programming languages",
//     skillWeight: SkillWeight["2/5"],
//   },
//   {
//     skillName: "Git",
//     skillCategory: "Devops",
//     skillWeight: SkillWeight["3/5"],
//   },
//   {
//     skillName: "Google searching",
//     skillCategory: "Intelligence",
//     skillWeight: SkillWeight["3/5"],
//   },
//   {
//     skillName: "Task delegation",
//     skillCategory: "Intelligence",
//     skillWeight: SkillWeight["1/5"],
//   },
//   {
//     skillName: "Salary negotiation skill",
//     skillCategory: "Soft skills",
//     skillWeight: SkillWeight["1/5"],
//   },
// ];

const SkillListPage: React.FC<ISkill[]> = () => {
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    try {
      const skillData = await SkillsSvc.getSkill();
      setSkills(skillData);
    } catch (e) {
      console.log("fetchSkills:: error::", e);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.tableName}>Skill List</h2>
        <Button className={styles.addButton} type="primary">
          <Link to="/skill">Add new</Link>
        </Button>
      </div>
      <SkillList skills={skills} fetchSkills={fetchSkills} />
    </>
  );
};

export default SkillListPage;
