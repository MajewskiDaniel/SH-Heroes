import {ISkill, ISkillDB, skillSchema} from "../models";
import mongoose, {Model} from "mongoose";

export class SkillService {
  Skill: Model<ISkillDB>;

  constructor() {
    this.Skill = mongoose.model<ISkillDB>("Skill", skillSchema);
  }

  async getCategories() {
    return this.Skill.distinct("skillCategory");
  };

  async getSkills({ page = 1, limit = 5, sortBy = "skillName", criteria = "asc" }) {
    return this.Skill.find()
      .sort({ [sortBy]: criteria })
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .exec();
  }

  async getSkillById(id: string) {
    return this.Skill.findById(id)
  }

  async postSkill(skill: ISkill) {
    if( ! (await this.occurred(skill))){
      const skillModel = new this.Skill(skill);
      return skillModel.save();
    } else {
      throw new Error('occurred');
    }
  }

  async editSkill(id: string, skill: ISkill) {
    return this.Skill.findByIdAndUpdate(id, skill, { new: true });
  }

  async deleteSkill(id: string) {
    return this.Skill.findByIdAndDelete(id);
  }

  async countRecords() {
    return this.Skill.countDocuments();
  }

  async occurred(skill: ISkill) {
    const occurred = await this.Skill.find({skillName: skill.skillName});
    return occurred.length > 0;
  }
}
