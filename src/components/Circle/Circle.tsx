import React from 'react';
import {SkillLevel, skillLevelMap} from '../../models/employee';
import styles from './Circle.module.scss';

export interface ICircleProps {
  level: SkillLevel
}

export const Circle: React.FC<ICircleProps> = ({level}) => {
  return (
    <div className={styles[skillLevelMap.get(level)]}>
    </div>
  );
}

