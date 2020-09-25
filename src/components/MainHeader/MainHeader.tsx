import React from 'react';
import {Layout, Input, Button} from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons';
import { Authentication } from "../../services/Authentication";
import styles from "./MainHeader.module.scss";

const { Header } = Layout;
const { Search } = Input;

export interface IHeader {
  collapsed: boolean
  toggle: ()=>void;
}

export const MainHeader: React.FC<IHeader> = ({collapsed, toggle}) => (
  < Header className={styles.Header}>
    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: toggle
    })}
    <Button className={styles.Button} onClick={()=>Authentication.logout()}>Log out</Button>
  </Header>
);
