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

const Template: Story<{ employees: IEmployee[], fetchEmployees: any }> = (args) => (
  <EmployeeList {...args} />
);

export const TestEmployeeTable = Template.bind({});

TestEmployeeTable.args = {
  employees: [
    {
      firstName: "Arnold",
      lastName: "Schwarzenegger",
      startingYear: "1992",
      lastEvaluationDate: "2005-01-01",
      projectName: "California",
      tags: ["#governer", "#predator"],
      level: SeniorityLevel.SENIOR,
      position: EmployeePosition.TESTER,
      photo:
        "https://pbs.twimg.com/profile_images/590109832721608704/OHxdR_1w.jpg",
    },
    {
      firstName: "Jan",
      lastName: "Kowalski",
      startingYear: "1982",
      lastEvaluationDate: "2000-01-01",
      projectName: "California",
      tags: ["#governer", "#predator", "#noob", "#pro"],
      level: SeniorityLevel.JUNIOR,
      position: EmployeePosition.PROJECT_MANAGER,
      photo:
        "https://le-mot-juste-en-anglais.typepad.com/.a/6a010535f04dfe970b01538de78819970b-pi",
    },
    {
      firstName: "Tony",
      lastName: "Halik",
      startingYear: "1942",
      lastEvaluationDate: "2005-01-01",
      projectName: "California",
      tags: ["#governer", "#predator", "#winner", "#fighter", "#alcoholic"],
      level: SeniorityLevel.SENIOR,
      position: EmployeePosition.TESTER,
      photo: "https://www.rodsbot.com/images_maps/3433-map.jpg",
    },
    {
      firstName: "Arnold",
      lastName: "Schwarzenegger",
      startingYear: "2019",
      lastEvaluationDate: "2005-01-01",
      projectName: "California",
      tags: ["#governer"],
      level: SeniorityLevel.SENIOR,
      position: EmployeePosition.TESTER,
      photo: "https://avatarfiles.alphacoders.com/208/208379.jpg",
    },
    {
      firstName: "Harry",
      lastName: "Potter",
      startingYear: "2000",
      lastEvaluationDate: "2005-01-01",
      projectName: "Hogwart",
      tags: ["#governer", "#predator"],
      level: SeniorityLevel.SENIOR,
      position: EmployeePosition.TESTER,
      photo:
        "https://pbs.twimg.com/profile_images/666068102673596421/kvffdCnC_400x400.jpg",
    },
    {
      firstName: "Rick",
      lastName: "Sanchez",
      startingYear: "1999",
      lastEvaluationDate: "2005-01-01",
      projectName: "Universe",
      tags: ["#governer", "#predator"],
      level: SeniorityLevel.MID,
      position: EmployeePosition.PROJECT_MANAGER,
      photo:
        "https://pbs.twimg.com/profile_images/651466697853919232/gYeh2uIf_400x400.png",
    },
    {
      firstName: "Harry",
      lastName: "Potter",
      startingYear: "2008",
      lastEvaluationDate: "2005-01-01",
      projectName: "Hogwart",
      tags: ["#governer", "#predator"],
      level: SeniorityLevel.MID,
      position: EmployeePosition.GRAPHIC_DESIGNER,
      photo:
        "https://dl1.cbsistatic.com/i/2018/12/06/ad2a58cc-5c08-4294-846c-207c37062125/92a2cc2c741b4252a751d0f55c594933/imgingest-4173370587859098101.png",
    },
    {
      firstName: "Rick",
      lastName: "Sanchez",
      startingYear: "1998",
      lastEvaluationDate: "2005-01-01",
      projectName: "Sanchezium",
      tags: ["#governer", "#predator"],
      level: SeniorityLevel.SENIOR,
      position: EmployeePosition.SOFTWARE_DEV,
      photo:
        "https://pbs.twimg.com/profile_images/695329482610114560/G87cXJVI.jpg",
    },
    {
      firstName: "Morty",
      lastName: "Morty",
      startingYear: "2011",
      lastEvaluationDate: "2005-01-01",
      projectName: "Morty",
      tags: ["#governer", "#predator"],
      level: SeniorityLevel.MID,
      position: EmployeePosition.SOFTWARE_DEV,
      photo:
        "https://cdn131.picsart.com/295538545024201.jpg?type=webp&to=crop&r=256",
    },
    {
      firstName: "Rick",
      lastName: "and Morty",
      startingYear: "2020",
      lastEvaluationDate: "2005-01-01",
      projectName: "Rick and Morty",
      tags: ["#rick", "#morty"],
      level: SeniorityLevel.JUNIOR,
      position: EmployeePosition.SOFTWARE_DEV,
      photo:
        "https://pbs.twimg.com/profile_images/719901420481196033/L2vhRTN9_400x400.jpg",
    },
    {
      firstName: "Arnold",
      lastName: "Schwarzenegger",
      startingYear: "2018",
      lastEvaluationDate: "2005-01-01",
      projectName: "California",
      tags: ["#governer", "#predator"],
      level: SeniorityLevel.JUNIOR,
      position: EmployeePosition.TESTER,
      photo: "https://tiny.pl/7jw83",
    },
  ],
  fetchEmployees: ()=>{}
};
