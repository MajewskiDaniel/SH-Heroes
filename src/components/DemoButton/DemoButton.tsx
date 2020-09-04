import React, { PropsWithChildren } from 'react';
import styles from './DemoButton.module.scss';

export interface IDemoButtonProps {
  color?: string;
}

export const DemoButton: React.FC<PropsWithChildren<IDemoButtonProps>> = ({
  children,
  color = 'olivegreen',
}) => (
  <button className={styles.DemoButton} style={{ backgroundColor: color }}>
    {children}
  </button>
);
