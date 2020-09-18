import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { SkillNameField, ISkillName } from "./SkillNameField";
import { ISkill } from "../../models/employee";

export default {
  title: "Storybook/SkillNameField",
  component: SkillNameField,
} as Meta;

const Template: Story<ISkillName> = (skillName) => (
  <SkillNameField {...skillName} />
);

export const ExampleSkillName1Field = Template.bind({});
ExampleSkillName1Field.args = {
  skillName: "Word",
};

export const ExampleSkillName2Field = Template.bind({});
ExampleSkillName2Field.args = {
  skillName: "JavaScript",
};

export const ExampleSkillName3Field = Template.bind({});
ExampleSkillName3Field.args = {
  skillName: "Alcohol resistance",
};
