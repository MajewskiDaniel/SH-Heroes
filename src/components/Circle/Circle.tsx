import React from 'react';
import classNames from 'classnames';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {ISkill, SkillLevel} from '../../models/employee';
import styles from './Circle.module.scss';

export interface ICircleProps {
  level: SkillLevel,
  skill: ISkill
}

export const Circle: React.FC<ICircleProps> = ({level, skill}) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    // console.log(e)
  }

  const handleOptionClick = ({ key }: any) => {
    console.log(key)
  }

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={(e) => handleOptionClick(e)}>
        <div className={classNames(styles[`SkillLevel-0`], styles.Circle)}></div>
      </Menu.Item>
      <Menu.Item key="1" onClick={(e) => handleOptionClick(e)}>
        <div className={classNames(styles[`SkillLevel-1`], styles.Circle)}></div>
      </Menu.Item>
      <Menu.Item key="2" onClick={(e) => handleOptionClick(e)}>
        <div className={classNames(styles[`SkillLevel-2`], styles.Circle)}></div>
      </Menu.Item>
      <Menu.Item key="3" onClick={(e) => handleOptionClick(e)}>
        <div className={classNames(styles[`SkillLevel-3`], styles.Circle)}></div>
      </Menu.Item>
      <Menu.Item key="4" onClick={(e) => handleOptionClick(e)}>
        <div className={classNames(styles[`SkillLevel-4`], styles.Circle)}></div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.Container}>
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={ (e) => handleClick(e) }>
          <div className={classNames(styles[`SkillLevel-${level}`], styles.Circle)}></div>
        </a>
      </Dropdown>
    </div>
  );
}

