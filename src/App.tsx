import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import logo from './logo.svg';
import { DemoButton } from './components/DemoButton/DemoButton';
import HomePage from './pages/Home/HomePage';
import EditorPage from './pages/Editor/EditorPage';
import ListPage from './pages/List/ListPage';
import NotFoundPage from "./pages/NotFound/NotFoundPage.";
import { Button, Popover, Modal } from 'antd';
import './App.scss';

export const App = () => {
  const [modalShown, setModalShown] = useState<boolean>(false);
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <h1>Praktyki!</h1>
        <img width={40} alt="" src={logo} />
      </header>
      <hr />
      Komponent testowy:
      <div>
        <DemoButton>This is a test!</DemoButton>
      </div>
      <hr />
      Komponenty antd:
      <div>
        <Button>Antd Button</Button>
      </div>
      <div>
        <Popover content={<strong>siemka</strong>}>
          <Button>Siema</Button>
        </Popover>
      </div>
      <div>
        <Modal onCancel={() => setModalShown(false)} visible={modalShown}>
          Jestem modalem
        </Modal>
        <Button onClick={() => setModalShown(true)}>Pokaż modal</Button>
      </div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/edit" component={EditorPage} />
        <Route path="/list" component={ListPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
    </Router>
  );
};

export default App;
