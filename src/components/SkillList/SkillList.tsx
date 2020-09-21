import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./SkillList.module.scss";
import { Skills } from "../../services/SkillFetch";
import { ISkill, skillWeightMap, ISkillPaginated } from "../../models/employee";
import {Table, Space, Popconfirm, notification} from "antd";
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
    try {
      await Skills.deleteSkill(skill);
      fetchSkills(limit, skills.currentPage, "", "");
      notification['success']({
        message: 'Success',
        description:
          `You have successfully deleted ${skill.skillName}`
      });
    } catch (e) {
      console.log(e);
      notification['error']({
        message: 'Error',
        description:
          `Skill ${skill.skillName} not deleted`
      });
    }
  };

  const limit = 5;

  interface IOptions {
    pageSize: number;
    currentPage: number;
    sortBy: string | undefined;
    sortOrder: string | undefined;
  }

  const [options, setOptions] = useState<IOptions>({
    pageSize: limit,
    currentPage: 1,
    sortBy: undefined,
    sortOrder: undefined,
  });

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
      if (
        sorter.field !== options.sortBy ||
        sorter.order !== options.sortOrder
      ) {
        setOptions({
          ...options,
          currentPage: 1,
          sortBy: sorter.field as string,
          sortOrder: sorter.order as string,
        });
      } else
        setOptions({ ...options, currentPage: pagination.current as number });
    }
  };

  useEffect(() => {
    fetchSkills(
      options.pageSize,
      options.currentPage,
      options.sortBy as string,
      options.sortOrder as string
    );
  }, [options]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={skills.skills}
        sortDirections={["ascend", "descend", "ascend"]}
        pagination={{
          pageSize: limit,
          current: skills.currentPage,
          total: skills.totalRecords,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};
