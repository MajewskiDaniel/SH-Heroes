import React, { useState, useEffect } from "react";
import styles from "./SkillListPage.module.scss";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { SkillList } from "../../components/SkillList/SkillList";
import { ISkill, SkillWeight, ISkillPaginated } from "../../models/employee";
import { SkillSvc } from "../../services/EmployeesSvc";

const SkillListPage: React.FC<ISkill[]> = () => {
  const [skills, setSkills] = useState<ISkillPaginated>({
    skills: [],
    currentPage: 1,
    totalRecords: 11
  });

  const fetchSkills = async (limit?: number, current?: number) => {
    try {
      const skillData = await SkillSvc.getSkills(limit, current);
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
