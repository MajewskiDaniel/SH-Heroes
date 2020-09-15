import React from "react";
import { Link } from "react-router-dom";
import styles from "./SkillList.module.scss";
import { SkillSvc } from "../../services/EmployeesSvc";
import { ISkill, skillWeightMap } from "../../models/employee";
import { Table, Space, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const SkillList: React.FC<{
  skills: ISkill[];
  fetchSkills: () => void;
}> = ({ skills, fetchSkills }) => {
  const onDelete = async (skill: ISkill) => {
    await SkillSvc.deleteSkill(skill);
    fetchSkills();
  };

  const columns = [
    {
      title: "Skill name",
      dataIndex: "skillName",
      key: "skillName",
    },
    {
      title: "Skill category",
      dataIndex: "skillCategory",
      key: "skillCategory",
    },
    {
      title: "Skill weight",
      dataIndex: "skillWeight",
      key: "skillWeight",
      render: (value: number) => <p>{skillWeightMap.get(value)}</p>,
    },
    {
      title: "Actions",
      dataIndex: "_id",
      key: "actions",
      render: (id: string, record: ISkill) => {
        let idParam = `/skill/${id}`;
        return (
          <Space size="middle">
            <Link to={idParam}>Edit</Link>
            <Popconfirm
              title={`Are you sure you want to delete '${record.skillName}' skill?`}
              onConfirm={() => onDelete(record)}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <a href="#">Delete</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={skills}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};
