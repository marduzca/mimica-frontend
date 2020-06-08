import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';
import Home from '../home/Home';
import WaitingRoom from '../waiting-room/WaitingRoom';
import Game from '../game/Game';
import Dummy from '../dummy/Dummy';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/waiting-room" component={WaitingRoom} />
            <Route path="/game" component={Game} />
            <Route path="/dummy" component={Dummy} />
          </Switch>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;