import React, { PropsWithChildren } from "react";
import styles from "./EmployeeList.module.scss";
import { IEmployee } from "../../models/employee";
import { Table, Avatar, Tag } from "antd";

export const EmployeeList: React.FC<PropsWithChildren<{
  employees: IEmployee[];
}>> = ({ employees }) => {
  const sortedEmployees = employees.sort(
    (a, b) => parseFloat(a.startingYear) - parseFloat(b.startingYear)
  );
  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo: string) => (
        <Avatar src={photo} size={64} shape="square" />
      ),
      width: 50,
      height: 50,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      // render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Starting Year",
      dataIndex: "startingYear",
      key: "startingYear",
    },
    {
      title: "Last Evaluation Date",
      dataIndex: "lastEvaluationDate",
      key: "lastEvaluationDate",
    },
    {
      title: "Actual Project",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => {
            return (
              <Tag color="blue" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Seniority Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text: string, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={sortedEmployees}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};
