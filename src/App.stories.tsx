import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { App } from './App';

export default {
  title: 'Storybook/App',
  component: App,
} as Meta;

export const DemoApp: Story<{}> = () => <App />;
