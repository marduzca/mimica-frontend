import React from 'react';
import PropTypes from 'prop-types';

import Player from './player/Player';

import './PlayerList.css';

function PlayerList(props) {

    const fillList = () => {
        return props.currentPlayers.map(player => {
            return (
                <Player key={player.name} name={player.name} isHost={player.host} points={800} position={1} inGame={props.inGame} />
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
    currentPlayers: PropTypes.array.isRequired
};

export default PlayerList;