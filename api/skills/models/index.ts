import mongoose, { Schema, Document } from "mongoose";

export interface ISkill {
  skillName: string;
  skillCategory: string;
  skillWeight: SkillWeight;
}

export enum SkillWeight {
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

export interface ISkillPaginated {
  skills: ISkill[];
  totalRecords: number;
  currentPage: number;
}

export const skillSchema: Schema = new Schema({
  skillName: String,
  skillCategory: String,
  skillWeight: Number,
});

export interface ISkillDB extends Document, ISkill {}
