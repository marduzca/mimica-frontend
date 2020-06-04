import React from 'react';
import './App.css';

import Home from '../home/Home';
import Game from '../game/Game';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WaitingRoom from 'components/waiting-room/WaitingRoom';
import Navbar from './navbar/Navbar';

import { withNamespaces } from 'react-i18next';

function App({ t }) {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/waiting-room" component={WaitingRoom} />
            <Route path="/game" component={Game} />
          </Switch>
        </main>
        <footer>
          <ul>
            <li>{t('Contact')}</li>
            <li>{t('Terms of service')}</li>
          </ul>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default withNamespaces()(App);