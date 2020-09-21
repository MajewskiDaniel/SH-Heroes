import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { TableHeader } from "./TableHeader";
import { ISkill } from "../../models/employee";

export default {
  title: "Storybook/TableHeader",
  component: TableHeader,
} as Meta;

const Template: Story<{ skills: ISkill[] }> = (skills) => (
  <TableHeader {...skills} />
);

export const ExampleTableHeader = Template.bind({});
ExampleTableHeader.args = {
  skills: [
    {
      _id: "5f608c5098a547765440bc5a",
      skillName: "Alcohol resistance",
      skillCategory: "Soft skills",
      skillWeight: 2,
    },
    {
      _id: "5f6485b04656221ab5bfb002",
      skillName: "Docker",
      skillCategory: "Devops",
      skillWeight: 0,
    },
    {
      _id: "5f6080e6434a9c72e69a409b",
      skillName: "Excel",
      skillCategory: "Programming languages",
      skillWeight: 2,
    },
    {
      _id: "5f608ca198a547765440bc5c",
      skillName: "Git",
      skillCategory: "Devops",
      skillWeight: 2,
    },
    {
      _id: "5f608c3e98a547765440bc59",
      skillName: "Java",
      skillCategory: "Programming languages",
      skillWeight: 4,
    },
    {
      _id: "5f6485584656221ab5bfb001",
      skillName: "JavaScript",
      skillCategory: "Programming languages",
      skillWeight: 4,
    },
    {
      _id: "5f61bab82dfc2064e5676b62",
      skillName: "Salary negotiation",
      skillCategory: "Crucial",
      skillWeight: 0,
    },
    {
      _id: "5f61bae02dfc2064e5676b64",
      skillName: "Small talk",
      skillCategory: "Soft skills",
      skillWeight: 1,
    },
    {
      _id: "5f61bb5c2dfc2064e5676b66",
      skillName: "Time wasting",
      skillCategory: "Soft skills",
      skillWeight: 2,
    },
    {
      _id: "5f608c8e98a547765440bc5b",
      skillName: "Windows",
      skillCategory: "Crucial",
      skillWeight: 3,
    },
    {
      _id: "5f608c2e98a547765440bc58",
      skillName: "Word",
      skillCategory: "Programming languages",
      skillWeight: 4,
    },
  ],
};
