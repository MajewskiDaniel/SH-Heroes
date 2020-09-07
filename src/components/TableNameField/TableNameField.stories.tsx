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
  avatar:
    "https://vignette.wikia.nocookie.net/polski-dubbing/images/3/37/Arnold_Schwarzenegger.jpg/revision/latest?cb=20190901112218&path-prefix=pl",
};
