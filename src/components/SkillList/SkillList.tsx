import React from "react";
import { Link } from "react-router-dom";
import styles from "./SkillList.module.scss";
import { SkillSvc } from "../../services/EmployeesSvc";
import { ISkill, skillWeightMap, ISkillPaginated } from "../../models/employee";
import { Table, Space, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { TablePaginationConfig } from "antd/lib/table";
import { SorterResult } from "antd/lib/table/interface";

export const SkillList: React.FC<{
  skills: ISkillPaginated;
  fetchSkills: (
    limit: number,
    current: number,
    sorter: string,
    order: string
  ) => void;
}> = ({ skills, fetchSkills }) => {
  const onDelete = async (skill: ISkill) => {
    await SkillSvc.deleteSkill(skill);
    fetchSkills(limit, skills.currentPage, "", "");
  };

  const columns = [
    {
      title: "Skill name",
      dataIndex: "skillName",
      key: "skillName",
      sorter: true,
    },
    {
      title: "Skill category",
      dataIndex: "skillCategory",
      key: "skillCategory",
      sorter: true,
    },
    {
      title: "Skill weight",
      dataIndex: "skillWeight",
      key: "skillWeight",
      sorter: true,
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

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, React.Key[] | null>,
    sorter: SorterResult<ISkill> | SorterResult<ISkill>[]
  ) => {
    if (!Array.isArray(sorter)) {
      // console.log("params", pagination, filters, sorter);
      const criteria = sorter.order === "ascend" ? "asc" : "desc";
      fetchSkills(
        pagination.pageSize || limit,
        pagination.current || 0,
        sorter.field as string,
        criteria
      );
    }
  };

  const limit = 5;

  return (
    <div>
      <Table
        columns={columns}
        dataSource={skills.skills}
        pagination={{
          pageSize: limit,
          current: skills.currentPage,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};
