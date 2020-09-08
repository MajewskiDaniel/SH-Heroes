import React, { PropsWithChildren } from "react";
// import styles from "./EmployeeList.module.scss";
import { IEmployee } from "../../models/employee";
import { Table } from "antd";

export const EmployeeList: React.FC<PropsWithChildren<{
  employees: IEmployee[];
}>> = ({ employees }) => {
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Starting Year",
      dataIndex: "startingYear",
    },
    {
      title: "Last Evaluation Date",
      dataIndex: "lastEvaluationDate",
    },
    {
      title: "Actual Project",
      dataIndex: "projectName",
    },
    {
      title: "Tags",
      dataIndex: "tags",
    },
    {
      title: "Seniority Level",
      dataIndex: "level",
    },
    {
      title: "Position",
      dataIndex: "position",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      render: (photo: string) => <img src={photo} />,
      width: 100,
      height: 100,
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
      <Table columns={columns} dataSource={employees} size="middle" />
    </div>
  );
};
