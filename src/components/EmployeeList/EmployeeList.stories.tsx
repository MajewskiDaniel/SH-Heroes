import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { EmployeeList } from "./EmployeeList";
import {
  IEmployee,
  SeniorityLevel,
  EmployeePosition,
} from "../../models/employee";

export default {
  title: "Storybook/EmployeeList",
  component: EmployeeList,
} as Meta;

const Template: Story<{ employees: IEmployee[] }> = (args) => (
  <EmployeeList {...args} />
);

export const TestEmployeeTable = Template.bind({});

TestEmployeeTable.args = {
  employees: [
    {
      firstName: "Arnold",
      lastName: "Schwarzenegger",
      startingYear: "1962",
      lastEvaluationDate: "2005-01-01",
      projectName: "California",
      tags: ["#governer", "predator"],
      level: SeniorityLevel.Senior,
      position: EmployeePosition.Tester,
      photo: "https://tiny.pl/7jw83",
    },
    {
      firstName: "Jan",
      lastName: "Kowalski",
      startingYear: "1982",
      lastEvaluationDate: "2000-01-01",
      projectName: "California",
      tags: ["#governer", "predator"],
      level: SeniorityLevel.Junior,
      position: EmployeePosition.ProjectManager,
      photo: "https://tiny.pl/7jw83",
    },
    {
      firstName: "Tony",
      lastName: "Halik",
      startingYear: "1942",
      lastEvaluationDate: "2005-01-01",
      projectName: "California",
      tags: ["#governer", "predator"],
      level: SeniorityLevel.Senior,
      position: EmployeePosition.Tester,
      photo: "https://tiny.pl/7jw83",
    },
  ],
};
