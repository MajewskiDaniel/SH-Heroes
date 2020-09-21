import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { SkillNameField } from "./SkillNameField";

export default {
  title: "Storybook/SkillNameField",
  component: SkillNameField,
} as Meta;

const Template: Story<String> = (skillName) => (
  <SkillNameField {...skillName} />
);

export const ExampleSkillName1Field = Template.bind({});
ExampleSkillName1Field.args = "Word";

export const ExampleSkillName2Field = Template.bind({});
ExampleSkillName2Field.args = "JavaScript";

export const ExampleSkillName3Field = Template.bind({});
ExampleSkillName3Field.args = "Alcohol resistance";
