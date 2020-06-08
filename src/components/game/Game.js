import React from 'react';
import PropTypes from 'prop-types';

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

Game.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            time: PropTypes.number.isRequired,
            numberOfRounds: PropTypes.number.isRequired,
            playerName: PropTypes.string.isRequired
        })
    })
};

export default Game;