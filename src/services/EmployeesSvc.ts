import {IEmployee} from "../models/employee";
import employeesData from "../employeesData.json";

let employees: IEmployee[] = employeesData;

export const EmployeesSvc = {
  url: `${process.env.REACT_APP_URL}/employees`,
  mocking: true,

  async getEmployee (id: number | undefined = undefined){
    if(this.mocking) {
      return mockGetEmployee();
    } else {
      return fetchGetEmployee(this.url);
    }
  },

  async addEmployee (employee: IEmployee){
    if(this.mocking) {
      return mockAddEmployee(employee);
    } else {
      return fetchAddEmployee(this.url, employee);
    }
  },

  async editEmployee (employee: IEmployee) {
    if(this.mocking) {
      return mockEditEmployee(employee);
    } else {
      return fetchEditEmployee(this.url, employee);
    }
  },

  async deleteEmployee (employee: IEmployee) {
    if(this.mocking) {
      return mockDeleteEmployee(employee);
    } else {
      return fetchDeleteEmployee(this.url, employee);
    }
  }
}

function checkForError (response: any) {
  if (!response.ok) throw Error(response.statusText);
  return response.json();
};

async function mockAddEmployee (employee: IEmployee) {
  employees.push(employee);
  const resp =  await new Promise((resolve) => setTimeout(() => resolve(employees), 1000));
  return resp;
}

async function fetchAddEmployee(url: string, employee: IEmployee) {
  try {
    const resp = await fetch(
      `${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      });
    checkForError(resp);
    const data = await resp.json();
    return data;
  } catch (e) {
    console.log(e)
  }
}

function mockGetEmployee() {
  return new Promise((resolve) => setTimeout(() => resolve(employees), 1000));
}

async function fetchGetEmployee(url: string) {
  try {
    const resp = await fetch(`${url}`);
    checkForError(resp);
    const data = await resp.json();
    return data;
  } catch (e) {
    console.log(e)
  }
}

function mockEditEmployee(employee: IEmployee){
  employees = employees.map(e => e._id === employee._id ? employee : e);
  const resp = employees.find(e => e._id === employee._id);
  return new Promise((resolve) => setTimeout(() => resolve(resp), 1000));
}

async function fetchEditEmployee(url: string, employee: IEmployee) {
  try {
    const resp: any = await fetch(`${url}/${employee._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
      });
    checkForError(resp);
    const data = resp.json();
    return data;
  } catch (e) {
    console.log(e)
  }
}

function mockDeleteEmployee(employee: IEmployee) {
  employees = employees.filter( e => e._id !== employee._id);
  return new Promise((resolve) => setTimeout(() => resolve(employees), 1000));
}

async function fetchDeleteEmployee(url: string, employee: IEmployee) {
  try {
    const resp = await fetch(`${url}/${employee._id}`, {
        method: "DELETE"
      });
    checkForError(resp);
    const data = await resp.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
