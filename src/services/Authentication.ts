import { ILogin } from "../models/employee";
import {checkForError} from "./Utils";

export const Authentication = {
  url: `${process.env.REACT_APP_URL}/login`,

  async login(user: ILogin) {
    try {
      const resp = await fetch(this.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      checkForError(resp);
      const u = await resp.json();
      await this.saveToken(u.token);
      return true;
    } catch (e) {
      return false;
      console.log(e)
    }
  },

  logout() {
    localStorage.clear();
  },

  async saveToken(token: string) {
    localStorage.setItem('token', token);
  }
}
