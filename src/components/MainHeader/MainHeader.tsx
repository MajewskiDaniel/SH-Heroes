import React from 'react';
import { Layout, Input } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;

export interface IHeader {
  collapsed: boolean
  toggle: ()=>void;
}

export const MainHeader: React.FC<IHeader> = ({collapsed, toggle}) => (
  < Header className="ant-layout-header">
    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: toggle
    })}
    <Search
      placeholder="Search employee"
      onSearch={value => console.log(value)}
      style={{ width: 200 }}
    />
  </Header>
);
