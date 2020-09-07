import React from "react";
import {Layout, Menu} from "antd";
import { TableOutlined, FileOutlined, PieChartOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import styles from './Sidenav.module.scss';

const { Sider } = Layout;

export interface ISidenav {
  collapsed: boolean;
}

export const Sidenav: React.FC<ISidenav> = ({collapsed}) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className={styles.logo} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<TableOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileOutlined />}>
            <Link to="/skillsets">Skillsets</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PieChartOutlined />}>
            <Link to="/employees">Employees</Link>
          </Menu.Item>
      </Menu>
    </Sider>
  );
}

