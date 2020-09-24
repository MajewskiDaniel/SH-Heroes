import React from 'react';
import classNames from 'classnames';
import { Menu, Dropdown } from 'antd';
import {ISkill, SkillLevel, skillLevelMap} from '../../models/employee';
import styles from './Circle.module.scss';

export interface ICircleProps {
  level: SkillLevel,
  skill: ISkill,
  handleLevelClick: (key: React.ReactText, skill: ISkill) => void,
  disabled: boolean
}

export const Circle: React.FC<ICircleProps> = ({level, skill, handleLevelClick, disabled}) => {
  const menu = (
    <Menu>
      {Array.from(skillLevelMap.keys()).map((key) => (
        <Menu.Item key={key} onClick={(e) => !disabled && handleLevelClick(e.key, skill)}>
          <div className={classNames(styles[`SkillLevel-${key}`], styles.Circle)}></div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={styles.Container}>
      <Dropdown overlay={menu} trigger={['click']} disabled={disabled}>
        <a className="ant-dropdown-link" onClick={ (e) => e.preventDefault() }>
          <div className={classNames(styles[`SkillLevel-${level}`], styles.Circle, disabled && styles.Disable)}></div>
        </a>
      </Dropdown>
    </div>
  );
}

