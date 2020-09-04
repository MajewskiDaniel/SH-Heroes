import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { DemoButton, IDemoButtonProps } from './DemoButton';

export default {
  title: 'Storybook/DemoButton',
  component: DemoButton,
} as Meta;

const Template: Story<IDemoButtonProps> = (args) => (
  <DemoButton {...args}>Test content</DemoButton>
);

export const RedButton = Template.bind({});
RedButton.args = {
  color: 'orangered',
};

export const BlueButton = Template.bind({});
BlueButton.args = {
  color: 'lightblue',
};

export const YellowButton: Story<IDemoButtonProps> = () => (
  <DemoButton color="yellow">Test content</DemoButton>
);
