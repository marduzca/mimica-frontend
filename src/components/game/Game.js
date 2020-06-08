import React from 'react';

import GameBar from './gamebar/GameBar';
import PlayersList from '../players-list/PlayersList';
import VideoCamera from './videocam/VideoCamera';
import Chat from './chat/Chat';

import './Game.css';

function Game(props) {
    return (
        <div className="game">
            <GameBar time={props.location.state.time} numberOfRounds={props.location.state.numberOfRounds} />
            <div className="gameplay">
                <PlayersList playerName={props.location.state.playerName} inGame={true} />
                <VideoCamera />
                <Chat />
            </div>
        </div>
    );
}

export default Game;