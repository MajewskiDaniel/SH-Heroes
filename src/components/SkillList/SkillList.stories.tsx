import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { SkillList } from "./SkillList";
import { ISkill, SkillWeight, ISkillPaginated } from "../../models/employee";

export default {
  title: "Storybook/SkillList",
  component: SkillList,
} as Meta;

const Template: Story<{ skills: ISkillPaginated; fetchSkills: any }> = (args) => (
  <SkillList {...args} />
);

export const TestSkillsTable = Template.bind({});

const skills: ISkillPaginated = {
  skills: [
    {
      skillName: "Word",
      skillCategory: "Programming languages",
      skillWeight: SkillWeight["3/5"],
    },
    {
      skillName: "Excel",
      skillCategory: "Programming languages",
      skillWeight: SkillWeight["4/5"],
    },
    {
      skillName: "Java",
      skillCategory: "Programming languages",
      skillWeight: SkillWeight["2/5"],
    },
    {
      skillName: "Alcohol resistance",
      skillCategory: "Soft skills",
      skillWeight: SkillWeight["5/5"],
    },
    {
      skillName: "Windows",
      skillCategory: "Environment",
      skillWeight: SkillWeight["4/5"],
    },
    {
      skillName: "Linux",
      skillCategory: "Environment",
      skillWeight: SkillWeight["1/5"],
    },
    {
      skillName: "Script",
      skillCategory: "Programming languages",
      skillWeight: SkillWeight["2/5"],
    },
    {
      skillName: "Git",
      skillCategory: "Devops",
      skillWeight: SkillWeight["3/5"],
    },
    {
      skillName: "Google searching",
      skillCategory: "Intelligence",
      skillWeight: SkillWeight["3/5"],
    },
    {
      skillName: "Task delegation",
      skillCategory: "Intelligence",
      skillWeight: SkillWeight["1/5"],
    },
    {
      skillName: "Salary negotiation skill",
      skillCategory: "Soft skills",
      skillWeight: SkillWeight["1/5"],
    },
  ],
  totalRecords: 2,
  currentPage: 1,
}

  TestSkillsTable.args = {
  skills,
  fetchSkills: () => {},
};
