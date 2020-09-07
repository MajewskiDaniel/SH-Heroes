import React from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styles from './MainHeader.module.scss';

const { Header } = Layout;

export interface IHeader {
  collapsed: boolean
  toggle: ()=>void;
}

export const MainHeader: React.FC<IHeader> = ({collapsed, toggle}) => (
  <Header className="site-layout-background" >
    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: toggle
    })}
  </Header>
);
