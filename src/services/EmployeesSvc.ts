import {EmployeePosition, IEmployee, SeniorityLevel} from "../models/employee";
import employeesData from "../employeesData.json";

let employees: IEmployee[] = employeesData;

export const EmployeesSvc = {
  url: `${process.env.REACT_APP_URL}/employees`,
  mocking: false,

  async getEmployee (id: number | undefined = undefined){
    if(this.mocking) {
      return mockGetEmployee();
    } else {
      return getEmployee(this.url);
    }
  },

  async addEmployee (employee: IEmployee){
    if(this.mocking) {
      return mockAddEmployee(employee);
    } else {
      return addEmployee(this.url, employee);
    }
  },

  async editEmployee (employee: IEmployee) {
    console.log('edit employee');

  }
}

function mockAddEmployee (employee: IEmployee) {
  employees.push(employee);
  console.log(employees);
  return employees[employees.length-1];
}

async function addEmployee(url: string, employee: IEmployee) {
  try {
    const resp = await fetch(
      `${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      });
    const dataImp = await resp.json();
    return dataImp;
  } catch (e) {
    console.log(e)
  }
}

function mockGetEmployee() {
  return employees;
}

async function getEmployee(url: string) {
  try {
    const resp = await fetch(`${url}`);
    const data = await resp.json();
    return data;
  } catch (e) {
    console.log(e)
  }
}

function mockEditEmployee(employee: IEmployee){
  employees = employees.map(e => e._id === employee._id ? employee : e);
  const returned = employees.find(e => e._id === employee._id);
  return returned;
}

async function editEmployee(url: string, employee: IEmployee) {
  try {
    const resp: any = await fetch(`${url}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
      }
    );
    const data = resp.json();
  } catch (e) {
    console.log(e)
  }
}
