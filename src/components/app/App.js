import React from 'react';
import './App.css';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

import Home from '../home/Home';
import Game from '../game/Game';
import WaitingRoom from 'components/waiting-room/WaitingRoom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {
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
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;