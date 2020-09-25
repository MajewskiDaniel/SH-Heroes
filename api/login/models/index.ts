import { Schema, Document } from "mongoose";

export interface ILogin {
  login: string;
  password: string;
}

export const loginSchema: Schema = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export interface ILoginDB extends Document, ILogin {}

export interface IToken {
  user: string,
  token: string
}

export const tokenSchema: Schema = new Schema({
  user: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

export interface ITokenDB extends Document, IToken {}
