import React, { PropsWithChildren } from "react";
import { EmployeeList } from "../../components/EmployeeList/EmployeeList";
import {
  IEmployee,
  EmployeePosition,
  SeniorityLevel,
} from "../../models/employee";

const employees: IEmployee[] = [
  {
    firstName: "Arnold",
    lastName: "Schwarzenegger",
    startingYear: "1992",
    lastEvaluationDate: "2005-01-01",
    projectName: "California",
    tags: ["#governer", "#predator"],
    level: SeniorityLevel.SENIOR,
    position: EmployeePosition.TESTER,
    photo: "https://tiny.pl/7jw83",
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
    photo: "https://tiny.pl/7jw83",
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
    photo: "https://tiny.pl/7jw83",
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
    photo: "https://tiny.pl/7jw83",
  },
  {
    firstName: "Arnold",
    lastName: "Schwarzenegger",
    startingYear: "2000",
    lastEvaluationDate: "2005-01-01",
    projectName: "California",
    tags: ["#governer", "#predator"],
    level: SeniorityLevel.SENIOR,
    position: EmployeePosition.TESTER,
    photo: "https://tiny.pl/7jw83",
  },
  {
    firstName: "Arnold",
    lastName: "Schwarzenegger",
    startingYear: "1999",
    lastEvaluationDate: "2005-01-01",
    projectName: "California",
    tags: ["#governer", "#predator"],
    level: SeniorityLevel.MID,
    position: EmployeePosition.PROJECT_MANAGER,
    photo: "https://tiny.pl/7jw83",
  },
  {
    firstName: "Arnold",
    lastName: "Schwarzenegger",
    startingYear: "2008",
    lastEvaluationDate: "2005-01-01",
    projectName: "California",
    tags: ["#governer", "#predator"],
    level: SeniorityLevel.MID,
    position: EmployeePosition.GRAPHIC_DESIGNER,
    photo: "https://tiny.pl/7jw83",
  },
  {
    firstName: "Arnold",
    lastName: "Schwarzenegger",
    startingYear: "1998",
    lastEvaluationDate: "2005-01-01",
    projectName: "California",
    tags: ["#governer", "#predator"],
    level: SeniorityLevel.SENIOR,
    position: EmployeePosition.SOFTWARE_DEV,
    photo: "https://tiny.pl/7jw83",
  },
  {
    firstName: "Arnold",
    lastName: "Schwarzenegger",
    startingYear: "2011",
    lastEvaluationDate: "2005-01-01",
    projectName: "California",
    tags: ["#governer", "#predator"],
    level: SeniorityLevel.MID,
    position: EmployeePosition.SOFTWARE_DEV,
    photo: "https://tiny.pl/7jw83",
  },
  {
    firstName: "Arnold",
    lastName: "Schwarzenegger",
    startingYear: "2020",
    lastEvaluationDate: "2005-01-01",
    projectName: "California",
    tags: ["#governer", "#predator"],
    level: SeniorityLevel.JUNIOR,
    position: EmployeePosition.SOFTWARE_DEV,
    photo: "https://tiny.pl/7jw83",
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
];

const EmployeeListPage: React.FC<PropsWithChildren<IEmployee[]>> = (args) => {
  return (
    <>
      <h2>Employee List</h2>
      <EmployeeList employees={employees} />
    </>
  );
};

export default EmployeeListPage;
