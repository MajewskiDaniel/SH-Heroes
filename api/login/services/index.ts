import mongoose from "mongoose";
import {
  ILoginDB,
  loginSchema,
  ILogin,
  ITokenDB,
  tokenSchema,
} from "../models";

export class LoginService {
  static Login = mongoose.model<ILoginDB>("Login", loginSchema);
  static Token = mongoose.model<ITokenDB>("Token", tokenSchema);

  constructor() {}

  async getUsers() {
    return LoginService.Login.find();
  }

  async findUser(login: string, password: string) {
    return LoginService.Login.findOne({ login: login, password: password });
  }

  async authorize(login: string, password: string) {
    const user = await this.findUser(login, password);
    if (user) {
      const resp = await this.addToken(login);
      return resp;
    } else {
      throw new Error("Not authorized");
    }
  }

  async addUser(user: ILogin) {
    const employeeModel = new LoginService.Login(user);
    return employeeModel.save();
  }

  async getTokens() {
    return LoginService.Token.find();
  }

  async getToken(token: string) {
    return LoginService.Token.findOne({ token: token });
  }

  async addToken(user: string) {
    const token = this.generateToken();
    const authUserModel = new LoginService.Token({ user: user, token: token });
    return authUserModel.save();
  }

  async deleteToken(token: string) {
    return LoginService.Token.findOneAndDelete({ token: token });
  }

  generateToken() {
    const rand = () => {
      return Math.random().toString(36).substr(2);
    };

    return rand() + rand();
  }
}
