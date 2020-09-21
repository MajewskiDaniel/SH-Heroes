import { IEmployee } from "../models/employee";
import applyMock from "./employee.mock";
import { checkForError } from "./Utils";

const MOCKED_DATA = false;
if (MOCKED_DATA) {
  applyMock();
}

export const EmployeeFetch = {
  url: `${process.env.REACT_APP_URL}/employees`,

  async getEmployees() {
    const resp = await fetch(this.url);
    checkForError(resp);
    return await resp.json();
  },

  async getEmployee(id?: string) {
    const urlWithId = id ? `${this.url}/${id}` : this.url;
    const resp = await fetch(urlWithId);
    checkForError(resp);
    return await resp.json();
  },

  async addEmployee(employee: IEmployee) {
    const resp = await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    checkForError(resp);
    return await resp.json();
  },

  async editEmployee(employee: IEmployee, id?: string) {
    const resp: any = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    checkForError(resp);
    return await resp;
  },

  async deleteEmployee(employee: IEmployee) {
    const resp: any = await fetch(`${this.url}/${employee._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    checkForError(resp);
    return resp;
  },
};




