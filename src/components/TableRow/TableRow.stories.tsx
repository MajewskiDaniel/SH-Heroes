import React, {PropsWithChildren} from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import {TableRow, ITableRowProps} from './TableRow';
import {SkillLevel} from "../../models/employee";

export default {
  title: 'Storybook/TableRow',
  component: TableRow,
} as Meta;

const Template: Story<PropsWithChildren<ITableRowProps>> = (args) => (
  <table>
    <TableRow {...args}/>
  </table>
);

export const Table1Row = Template.bind({});
Table1Row.args = {
  employee: {
    disable: false,
    tags: [
      "love",
      "science"
    ],
    _id: "5f58da8d1d3dbb43e82764ed",
    firstName: "Morty",
    lastName: "Sanchez",
    startingYear: "2019",
    lastEvaluationDate: "2019-12-12",
    projectName: "Jessica",
    level: 1,
    position: 0,
    photo: "https://tiny.pl/7jw83",
    skills: [
      {
        skill: "5f608c5098a547765440bc5a",
        skillLevel: SkillLevel.FOUR
      },
      {
        skill: "5f608c8e98a547765440bc5b",
        skillLevel: SkillLevel.ONE
      }]
  },
  skills: [
    {
      _id: "5f6080e6434a9c72e69a409b",
      skillName: "Excel",
      skillCategory: "Programming skills",
      skillWeight: 2,
    },
    {
      _id: "5f608c2e98a547765440bc58",
      skillName: "Word",
      skillCategory: "Programming skills",
      skillWeight: 2,
    },
    {
      _id: "5f608c3e98a547765440bc59",
      skillName: "Java",
      skillCategory: "Programming languages",
      skillWeight: 4,
    },
    {
      _id: "5f608c5098a547765440bc5a",
      skillName: "Alcohol resistance",
      skillCategory: "Soft skills",
      skillWeight: 1,
    },
    {
      _id: "5f608c8e98a547765440bc5b",
      skillName: "Windows",
      skillCategory: "Crucial skills",
      skillWeight: 4,
    },
    {
      _id: "5f608ca198a547765440bc5c",
      skillName: "Git",
      skillCategory: "Devops",
      skillWeight: 2,
    }
  ],
  reload: ()=> {
    console.log('aaaaaaaa')
  },
  toggleEnable: (id) => {
    console.log('aaaaaaaa')
  }
};



