import React, { PropsWithChildren } from "react";
import styles from "./EmployeeList.module.scss";
import {
  IEmployee,
  seniorityMap,
  employeePositionMap,
} from "../../models/employee";
import { Table, Avatar, Tag, Space } from "antd";

export const EmployeeList: React.FC<PropsWithChildren<{
  employees: IEmployee[];
}>> = ({ employees }) => {
  const sortedEmployees = employees.sort(
    (a, b) => parseFloat(b.startingYear) - parseFloat(a.startingYear)
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
      render: (value: string) => {
        let date = new Date(value);
        let year = date.getFullYear().toString();
        return <p>{year}</p>;
      },
    },
    {
      title: "Last Evaluation Date",
      dataIndex: "lastEvaluationDate",
      key: "lastEvaluationDate",
      render: (value: string) => {
        let date = new Date(value);
        let year = date.getFullYear().toString();
        let month = date.getMonth().toString();
        let day = date.getDate().toString();
        return (
          <p>
            {day}-{month}-{year}
          </p>
        );
      },
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
      render: (value: number) => <p>{seniorityMap.get(value)}</p>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (value: number) => <p>{employeePositionMap.get(value)}</p>,
    },

    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (id: string) => {
        let idHref = `/employee/${id}`;
        return (
          <Space size="middle">
            <a href={idHref}>Edit</a>
            <a>Delete</a>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={employees}
        pagination={{ pageSize: 5 }}
        // rawKey={employees.map((employee)=>employee._id)}
        // rowKey={(record) => record._id}
      />
    </div>
  );
};
