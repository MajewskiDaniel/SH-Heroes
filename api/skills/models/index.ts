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
  skillName: {
    type: String,
    required: true
  },
  skillCategory: {
    type: String,
    required: true
  },
  skillWeight: {
    type: Number,
    required: true
  },
});

export interface ISkillDB extends Document, ISkill {}
