import React, { PropsWithChildren } from 'react';
import '../App.scss';

export const StoryWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <>{children}</>;
};
