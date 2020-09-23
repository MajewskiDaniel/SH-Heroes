import React, {PropsWithChildren} from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import {RowDisplayTotal, IRowDisplayTotal} from './RowDisplayTotal';
import {SkillLevel} from "../../models/employee";

export default {
  title: 'Storybook/RowDisplayTotal',
  component: RowDisplayTotal,
} as Meta;

const Template: Story<PropsWithChildren<IRowDisplayTotal>> = (args) => (
  <table>
    <RowDisplayTotal {...args}/>
  </table>
);

export const RowDisplayTotal1 = Template.bind({});
RowDisplayTotal1.args = {
  total: {
    "sss": 3
  },
  totalSkillLevel: {
    "ssssss": 3
  }
};





