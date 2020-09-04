import React from 'react';
import styles from './DemoList.module.scss';

export interface IDemoListProps {
  items: string[];
  horizontal?: boolean;
}

export const DemoList: React.FC<IDemoListProps> = ({ items, horizontal }) => (
  <div className={horizontal ? styles.DemoListHorizontal : styles.DemoList}>
    {items.map((item) => (
      <div className={styles.Item} key={item}>
        {item}
      </div>
    ))}
  </div>
);
