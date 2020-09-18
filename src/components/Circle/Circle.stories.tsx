import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import {Circle, ICircleProps} from './Circle';
import {SkillLevel} from "../../models/employee";

export default {
  title: 'Storybook/Circle',
  component: Circle,
} as Meta;

const Template: Story<ICircleProps> = (args) => (
  <Circle {...args}/>
);

export const Circle1Field = Template.bind({});
Circle1Field.args = {
  level: SkillLevel.ZERO
};

export const Circle2Field = Template.bind({});
Circle2Field.args = {
  level: SkillLevel.ONE
};

export const Circle3Field = Template.bind({});
Circle3Field.args = {
  level: SkillLevel.TWO
};
export const Circle4Field = Template.bind({});
Circle4Field.args = {
  level: SkillLevel.THREE
};
export const Circle5Field = Template.bind({});
Circle5Field.args = {
  level: SkillLevel.FOUR
};

