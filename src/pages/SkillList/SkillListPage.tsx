import React, { useState, useEffect, useCallback } from "react";
import styles from "./SkillListPage.module.scss";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { SkillList } from "../../components/SkillList/SkillList";
import { ISkill, SkillWeight, ISkillPaginated } from "../../models/employee";
import { Skills } from "../../services/SkillFetch";

const SkillListPage: React.FC = () => {
  const [skills, setSkills] = useState<ISkillPaginated>({
    skills: [],
    currentPage: 1,
    totalRecords: 11,
  });
  const fetchSkills = useCallback(
    async (
      limit?: number,
      current?: number,
      sortBy?: string,
      criteria?: string
    ) => {
      let sortingOrder = criteria === "descend" ? "desc" : "asc";
      try {
        const skillData = await Skills.getSkills(
          limit,
          current,
          sortBy,
          sortingOrder
        );
        setSkills(skillData);
      } catch (e) {}
    },
    [skills]
  );

  // useEffect(() => {
  //   fetchSkills();
  // }, []);

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
