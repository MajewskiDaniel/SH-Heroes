import React from 'react';
import {Layout, Input, Button} from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons';
import { Authentication } from "../../services/Authentication";
import { Consumer } from "../../components/AuthContext/AuthContext";
import styles from "./MainHeader.module.scss";

const { Header } = Layout;
const { Search } = Input;

export interface IHeader {
  collapsed: boolean
  toggle: ()=>void;
}

export const MainHeader: React.FC<IHeader> = ({collapsed, toggle}) => {
  const logOut = (setAuth: (value: boolean) => void) => {
    Authentication.logout();
    setAuth(false);
  }
  return (
    < Header className={styles.Header}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle
      })}
      <Consumer>
        {({setAuth}) => (
          <Button className={styles.Button} onClick={(value)=>logOut(setAuth)}>Log out</Button>
        )}
      </Consumer>
    </Header>
  );
}
