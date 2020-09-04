import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { DemoList, IDemoListProps } from './DemoList';

export default {
  title: 'Storybook/DemoList',
  component: DemoList,
} as Meta;

const TestData = ['Raz', 'Dwa', 'Trzy'];

export const BasicList: Story<IDemoListProps> = () => (
  <DemoList items={TestData} />
);

export const HorizontalList: Story<IDemoListProps> = () => (
  <DemoList items={TestData} horizontal />
);
