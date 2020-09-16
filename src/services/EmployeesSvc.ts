import {IEmployee} from "../models/employee";
import applyMock from './employee.mock'
import {ISkill, ISkillQuery} from "../models/employee"
import {number} from "yup";

const MOCKED_DATA = false;
if (MOCKED_DATA) {
  applyMock()
}

export const EmployeesSvc = {
  url: `${process.env.REACT_APP_URL}/employees`,

  async getEmployee(id?: string) {
    const urlWithId = id ? `${this.url}/${id}` : this.url;
    const resp = await fetch(urlWithId);
    checkForError(resp);
    return await resp.json();
  },

  async addEmployee(employee: IEmployee) {
    const resp = await fetch(
      this.url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(employee)
      });
    checkForError(resp);
    return await resp.json();
  },

  async editEmployee(employee: IEmployee, id?: string) {
    const resp: any = await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(employee)
    });
    checkForError(resp);
    return await resp;
  },

  async deleteEmployee(employee: IEmployee) {
    const resp: any = await fetch(`${this.url}/${employee._id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    });
    checkForError(resp);
    return resp;
  }
}

export const SkillSvc = {
  skillsUrl: `${process.env.REACT_APP_URL}/skills`,

  async getSkills (limit?: number, page?: number, sortBy?: string, criteria?: string) {

    const tempOptions = {
      limit,
      page,
      sortBy,
      criteria,
    }
    const url = new URL(this.skillsUrl);
    Object.entries(tempOptions)
      .forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, String(value))
      }
    });
    console.log(url.toString())
    const resp = await fetch(url.toString());
    checkForError(resp);
    return await resp.json();
  },

  async getSkill (id: string){
    const resp = await fetch(`${this.skillsUrl}/${id}`);
    checkForError(resp);
    return await resp.json();
  },

  async addSkill (skill: ISkill) {
    const resp = await fetch(this.skillsUrl, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skill)
    });
    checkForError(resp);
    return await resp.json();
  },

  async editSkill (skill: ISkill) {
    const resp = await fetch(`${this.skillsUrl}/${skill._id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skill)
    });
    checkForError(resp);
    return resp;
  },

  async deleteSkill (skill: ISkill) {
    const resp = await fetch(`${this.skillsUrl}/${skill._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    checkForError(resp);
    return resp;
  },

  async getCategories () {
    const resp = await fetch(`${process.env.REACT_APP_URL}/categories`);
    checkForError(resp);
    return await resp.json();
  }
}

function checkForError (response: any){
  if (!response.ok) throw Error(response.statusText);
};
