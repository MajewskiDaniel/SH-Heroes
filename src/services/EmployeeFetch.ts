import { IEmployee, ISkill, IEmployeeSkill } from "../models/employee";
import applyMock from "./employee.mock";
import { checkForError } from "./Utils";
import { http } from "./http";

const MOCKED_DATA = false;
if (MOCKED_DATA) {
  applyMock();
}

export const EmployeeFetch = {
  url: `${process.env.REACT_APP_URL}/employees`,

  async getEmployee(id?: string) {
    const urlWithId = id ? `${this.url}/${id}` : this.url;
    const resp = await http(urlWithId);
    checkForError(resp);
    return await resp.json();
  },

  async addEmployee(employee: IEmployee) {
    const resp = await http(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    checkForError(resp);
    return await resp.json();
  },

  async editEmployee(employee: IEmployee, id?: string) {
    const resp: any = await http(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    checkForError(resp);
    return await resp;
  },

  async editSkillLevel(
    employeeId: IEmployee["_id"],
    skillId: ISkill["_id"],
    level: Partial<IEmployeeSkill>
  ) {
    const resp: any = await http(
      `${this.url}/${employeeId}/skills/${skillId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(level),
      }
    );
    checkForError(resp);
    return await resp;
  },

  async deleteEmployee(employee: IEmployee) {
    const resp: any = await http(`${this.url}/${employee._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    checkForError(resp);
    return resp;
  },
};
