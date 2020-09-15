import {IEmployee} from "../models/employee";
import applyMock from './employee.mock'
import {ISkill} from "../models/employee"

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
    try {
      const resp = await fetch(
        this.url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(employee)
        });
      checkForError(resp);
      return await resp.json();
    } catch (e) {
      return false;
    }
  },

  async editEmployee(employee: IEmployee, id?: string) {
    const urlWithId = id ? `${this.url}/${id}` : this.url;

    try {
      const resp: any = await fetch(`${urlWithId}/`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(employee)
      });
      checkForError(resp);
      // const data = await resp.json();
      return true;
    } catch (e) {
      console.log(e)
      return false;
    }
  },

  async deleteEmployee(employee: IEmployee) {
    const urlWithId = `${this.url}/${employee._id}`;
    console.log('delete')
    try {
      const resp: any = await fetch(urlWithId, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
      });
      checkForError(resp);
      console.log(resp)
      // const data = await resp.json();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export const SkillSvc = {
  skillsUrl: `${process.env.REACT_APP_URL}/skills`,

  async getSkills () {
    const resp = await fetch(this.skillsUrl);
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
    const resp = await fetch(this.skillsUrl, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skill)
    });
    checkForError(resp);
    return await resp.json();
  },

  async deleteSkill (skill: ISkill) {
    const resp = await fetch(`${this.skillsUrl}/${skill._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    checkForError(resp);
    return resp;
  }
}

const checkForError = (response: any) => {
  if (!response.ok) throw Error(response.statusText);
};
