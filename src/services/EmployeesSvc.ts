import {IEmployee} from "../models/employee";
import employeesData from "../employeesData.json";

let employees: IEmployee[] = employeesData;
let id = 1;

export const EmployeesSvc = {
  url: `${process.env.REACT_APP_URL}/employees`,
  mocking: false,

  async getEmployee (id?: string){
    const urlWithId = id ? `${this.url}/${id}` : this.url;

    if(this.mocking) {
      return mockGetEmployee(id);
    } else {
      return fetchGetEmployee(urlWithId);
    }
  },

  async addEmployee (employee: IEmployee){
    if(this.mocking) {
      return mockAddEmployee(employee);
    } else {
      return addEmployee(this.url, employee);
    }
  },

  async editEmployee (employee: IEmployee, id?: string) {
    const urlWithId = id ? `${this.url}/${id}` : this.url;

    console.log('edit employee');
    if(this.mocking) {
      return mockEditEmployee(employee);
    } else {
      return fetchEditEmployee(urlWithId, employee);
    }
  },

  async deleteEmployee (employee: IEmployee) {
    const urlWithId = `${this.url}/${employee._id}`;
    if(this.mocking) {
      return mockDeleteEmployee(employee);
    } else {
      return fetchDeleteEmployee(urlWithId);
    }
  }
}

const checkForError = (response: any) => {
  if (!response.ok) throw Error(response.statusText);
};

function mockAddEmployee (employee: IEmployee) {
  const newEmployee = employee;
  newEmployee._id = id.toString();
  id++;
  employees.push(newEmployee);
  const data = employees[employees.length-1];
  return new Promise((resolve) => setTimeout(()=>resolve(data), 1000));
}


async function addEmployee(url: string, employee: IEmployee) {
  try {
    const resp = await fetch(
      `${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      });
    checkForError(resp);
    const dataImp = await resp.json();
    return dataImp;
  } catch (e) {
   return false;
  }
}

function mockGetEmployee(id?: string) {
  if(id){
    const user = employees.find( e => e._id === id);
    return new Promise((resolve) => setTimeout(()=>resolve(user), 1000));
  } else {
    return new Promise((resolve) => setTimeout(()=>resolve(employees), 1000));
  }
}

async function fetchGetEmployee(url: string) {
  try {
    const resp = await fetch(url);
    checkForError(resp);
    const data = await resp.json();
    return data;
  } catch (e) {
    return [];
  }
}

function mockEditEmployee(employee: IEmployee){
  employees = employees.map(e => e._id === employee._id ? employee : e);
  const data = employees.find(e => e._id === employee._id);
  return new Promise((resolve) => setTimeout(()=>resolve(data), 1000));
}

async function fetchEditEmployee(url: string, employee: IEmployee) {
  try {
    const resp: any = await fetch(`${url}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
      });
    checkForError(resp);
    // const data = await resp.json();
    return true;
  } catch (e) {
    console.log(e)
    return false;
  }
}

function mockDeleteEmployee(employee: IEmployee){
  employees = employees.filter(e => e._id !== employee._id);
  return new Promise((resolve) => setTimeout(()=>resolve(employee._id), 1000));;
}

async function fetchDeleteEmployee(url: string) {
  try {
    const resp: any = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    checkForError(resp);
    const data = await resp.json();
    return data;
  } catch (e) {
    return false;
  }
}
