import React, {PropsWithChildren} from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import {RowDisplayTotal, IRowDisplayTotal} from './RowDisplayTotal';
import {SkillLevel} from "../../models/employee";

export default {
  title: 'Storybook/RowDisplayTotal',
  component: RowDisplayTotal,
} as Meta;

const Template: Story<PropsWithChildren<IRowDisplayTotal>> = (args) => (
  <table>
    <RowDisplayTotal {...args}/>
  </table>
);

export const RowDisplayTotal1 = Template.bind({});
RowDisplayTotal1.args = {
  employees: [
    {
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
        skill: "5f608ca198a547765440bc3c",
        skillLevel: SkillLevel.ONE
      }
      ]
  },
    {
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
          skill:  "5f6080e6434a9c72e69a406b",
          skillLevel: SkillLevel.THREE
        },
        {
          skill:  "5f608c2e98a547765440bc58",
          skillLevel: SkillLevel.FOUR
        }]
    },
    {
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
          skill: "5f6080e6434a9c72e69a406b",
          skillLevel: SkillLevel.FOUR
        },
        {
          skill: "5f608c5098a547765440bc8a",
          skillLevel: SkillLevel.THREE
        }]
    },
  ],
  skills: [
    {
      _id: "5f6080e6434a9c72e69a406b",
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
      _id: "5f608c5098a547765440bc8a",
      skillName: "Alcohol resistance",
      skillCategory: "Soft skills",
      skillWeight: 1,
    },
    {
      _id: "5f608c8e98a547765440bc7b",
      skillName: "Windows",
      skillCategory: "Crucial skills",
      skillWeight: 4,
    },
    {
      _id: "5f608ca198a547765440bc3c",
      skillName: "Write",
      skillCategory: "Devops",
      skillWeight: 2,
    },
    {
      _id: "5f608ca198a547765440bc5c",
      skillName: "Talk",
      skillCategory: "Devops",
      skillWeight: 2,
    },
    {
      _id: "5f608ca198a547765440bc1c",
      skillName: "Google it",
      skillCategory: "Devops",
      skillWeight: 2,
    }
  ]
};





