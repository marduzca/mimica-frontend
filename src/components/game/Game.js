import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GameBar from './gamebar/GameBar';
import PlayerList from '../player-list/PlayerList';
import VideoCamera from './videocam/VideoCamera';
import Chat from './chat/Chat';
import socket from '../../webSocket';

import './Game.css';

function Game(props) {
    const [currentPlayers, setCurrentPlayers] = useState(props.location.state.currentPlayers);

    useEffect(() => {
        socket.on('currentPlayers', (players) => {
            setCurrentPlayers(players);
        });

    }, []);

    return (
        <div className="game">
            <GameBar time={props.location.state.time} numberOfRounds={props.location.state.numberOfRounds} />
            <div className="gameplay">
                <PlayerList currentPlayers={currentPlayers} inGame={true} />
                <VideoCamera />
                <Chat />
            </div>
        </div>
    );
}

Game.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            currentPlayers: PropTypes.array.isRequired,
            time: PropTypes.number.isRequired,
            numberOfRounds: PropTypes.number.isRequired
        })
    })
};

export default Game;