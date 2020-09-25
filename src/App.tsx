import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import SkillListPage from "./pages/SkillList/SkillListPage";
import EditorPage from "./pages/EmployeeForm/EditorPage";
import EmployeeListPage from "./pages/EmployeeList/EmployeeListPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage.";
import { Sidenav } from "./components/Sidenav/Sidenav";
import { MainHeader } from "./components/MainHeader/MainHeader";
import { SkillFormPage } from "./pages/SkillForm/SkillFormPage";
import { Layout } from "antd";

import "./App.scss";
import Login from "./pages/Login/LoginPage";

const { Content } = Layout;

export const App = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <Layout className="app-container">
        <Sidenav collapsed={collapsed}></Sidenav>
        <Layout>
          <MainHeader toggle={toggle} collapsed={collapsed}></MainHeader>
          <Content>
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/skill-list" component={SkillListPage} />
              <Route path="/employee-list" component={EmployeeListPage} />
              <Route path="/employee/:id" component={EditorPage} />
              <Route path="/employee" component={EditorPage} />
              <Route path="/skill/:id" component={SkillFormPage} />
              <Route path="/skill" component={SkillFormPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
