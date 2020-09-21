import {ISkill, ISkillDB, skillSchema} from "../models";
import mongoose  from "mongoose";

export class SkillService {
  static Skill = mongoose.model<ISkillDB>("Skill", skillSchema);

  constructor() {
  }

  async getCategories() {
    return SkillService.Skill.distinct("skillCategory");
  };

  async getSkills({ page = 1, limit = 5, sortBy = "skillName", criteria = "asc" }) {
    return SkillService.Skill.find()
      .sort({ [sortBy]: criteria })
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .exec();
  }

  async getSkillById(id: string) {
    return SkillService.Skill.findById(id)
  }

  async postSkill(skill: ISkill) {
    if( ! (await this.occurred(skill))){
      const skillModel = new SkillService.Skill(skill);
      return skillModel.save();
    } else {
      throw new Error('occurred');
    }
  }

  async editSkill(id: string, skill: ISkill) {
    return SkillService.Skill.findByIdAndUpdate(id, skill, { new: true });
  }

  async deleteSkill(id: string) {
    return SkillService.Skill.findByIdAndDelete(id);
  }

  async countRecords() {
    return SkillService.Skill.countDocuments();
  }

  async occurred(skill: ISkill) {
    const occurred = await SkillService.Skill.find({skillName: skill.skillName});
    return occurred.length > 0;
  }
}
