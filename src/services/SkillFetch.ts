import {ISkill} from "../models/employee";
import { checkForError } from "./Utils";
import applyMock from "./employee.mock";
import { http } from "./http";

const MOCKED_DATA = false;
if (MOCKED_DATA) {
  applyMock();
}

export const Skills = {
  skillsUrl: `${process.env.REACT_APP_URL}/skills`,

  async getSkills(
    limit?: number,
    page?: number,
    sortBy?: string,
    criteria?: string
  ) {
    const tempOptions = {
      limit,
      page,
      sortBy,
      criteria,
    };

    const url = new URL(this.skillsUrl);
    Object.entries(tempOptions).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, String(value));
      }
    });
    const resp = await http(url.toString());
    checkForError(resp);
    return await resp.json();
  },

  async getSkill(id: string) {
    const resp = await http(`${this.skillsUrl}/${id}`);
    checkForError(resp);
    return await resp.json();
  },

  async addSkill(skill: ISkill) {
    const resp = await http(this.skillsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skill),
    });
    checkForError(resp);
    return await resp.json();
  },

  async editSkill(skill: ISkill) {
    const resp = await http(`${this.skillsUrl}/${skill._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skill),
    });
    checkForError(resp);
    return resp;
  },

  async deleteSkill(skill: ISkill) {
    const resp = await http(`${this.skillsUrl}/${skill._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    checkForError(resp);
    return resp;
  },

  async getCategories() {
    const resp = await http(`${this.skillsUrl}/categories`);
    checkForError(resp);
    return await resp.json();
  },
};
