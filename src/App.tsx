import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import SkillListPage from "./pages/SkillList/SkillListPage";
import EditorPage from "./pages/EmployeeForm/EditorPage";
import EmployeeListPage from "./pages/EmployeeList/EmployeeListPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage.";
import GuardedRoute from "./components/GuardedRoute/GuardedRoute";
import { Sidenav } from "./components/Sidenav/Sidenav";
import { MainHeader } from "./components/MainHeader/MainHeader";
import { SkillFormPage } from "./pages/SkillForm/SkillFormPage";
import { Layout } from "antd";

import "./App.scss";

const { Content } = Layout;

export const App = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const isAuthenticated = true;

  return (
    <Router>
      <Layout className="app-container">
        <Sidenav collapsed={collapsed}></Sidenav>
        <Layout>
          <MainHeader toggle={toggle} collapsed={collapsed}></MainHeader>
          <Content>
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <GuardedRoute
                exact
                path="/home"
                component={HomePage}
                auth={isAuthenticated}
              />
              <GuardedRoute
                exact
                path="/skill-list"
                component={SkillListPage}
                auth={isAuthenticated}
              />
              <GuardedRoute
                path="/employee-list"
                component={EmployeeListPage}
                auth={isAuthenticated}
              />
              <GuardedRoute
                path="/employee/:id"
                component={EditorPage}
                auth={isAuthenticated}
              />
              <GuardedRoute
                path="/employee"
                component={EditorPage}
                auth={isAuthenticated}
              />
              <GuardedRoute
                path="/skill/:id"
                component={SkillFormPage}
                auth={isAuthenticated}
              />
              <GuardedRoute
                path="/skill"
                component={SkillFormPage}
                auth={isAuthenticated}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
