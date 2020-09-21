import React from 'react';
import classNames from 'classnames';
import { SkillLevel } from '../../models/employee';
import styles from './Circle.module.scss';

export interface ICircleProps {
  level: SkillLevel
}

export const Circle: React.FC<ICircleProps> = ({level}) => {
  return (
    <div className={styles.Container}>
      <div className={classNames(styles[`SkillLevel-${level}`], styles.Circle)}></div>
    </div>
  );
}

