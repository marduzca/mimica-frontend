import React from 'react';
import './App.css';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

import Home from '../home/Home';
import Game from '../game/Game';
import WaitingRoom from '../waiting-room/WaitingRoom';
import Dummy from '../dummy/Dummy';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


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