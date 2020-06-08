import React from 'react';
import PropTypes from 'prop-types';

import Player from './player/Player';

import './PlayerList.css';

function PlayerList(props) {
    const players = [
        {
            name: props.playerName,
            points: 100,
            position: 1
        },
        {
            name: 'Player 2',
            points: 80,
            position: 2
        },
        {
            name: 'Player 3',
            points: 50,
            position: 3
        },
        {
            name: 'Player 4',
            points: 30,
            position: 4
        },
        {
            name: 'Player 5',
            points: 10,
            position: 5
        }
    ];

    const fillList = () => {
        return players.map(player => {
            return (
                <Player key={player.name} name={player.name} points={player.points} position={player.position} inGame={props.inGame} />
            )
        });
    }

    return (
        <ul className="players">
            {fillList()}
        </ul>
    );
}

PlayerList.propTypes = {
    inGame: PropTypes.bool.isRequired,
    playerName: PropTypes.string.isRequired
};

export default PlayerList;