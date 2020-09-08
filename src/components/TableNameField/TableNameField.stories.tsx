import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { TableNameField, ITableNameFieldProps } from "./TableNameField";

export default {
  title: "Storybook/TableNameField",
  component: TableNameField,
} as Meta;

const Template: Story<ITableNameFieldProps> = (args) => (
  <TableNameField {...args} />
);

export const ExampleTableNameField = Template.bind({});
ExampleTableNameField.args = {
  firstName: "Arnold",
  lastName: "Schwarzenegger",
  avatar: "https://tiny.pl/7jw83",
};
