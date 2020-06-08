import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import Settings from './settings/Settings';
import Invitation from './invitation/Invitation';
import PlayersList from '../players-list/PlayersList';

import './WaitingRoom.css';

function WaitingRoom(props) {
    const { t } = props;
    const [startGame, setStartGame] = useState(false);
    const [numberOfRounds, setNumberOfRounds] = useState(3);
    const [time, setTime] = useState(80);

    const initializeGame = (numberOfRounds, time) => {
        setNumberOfRounds(numberOfRounds);
        setTime(time);
        setStartGame(true);
    }

    return startGame ?
        <Redirect to={{
            pathname: "/game",
            state: {
                playerName: props.location.state.playerName,
                language: props.location.state.language,
                numberOfRounds: numberOfRounds,
                time: time
            }
        }} />
        : (
            <div>
                <div className="main-container">
                    <div>
                        <h2>{t('Settings')}</h2>
                        <Settings language={props.location.state.language} initializeGame={initializeGame} />
                    </div>
                    <PlayersList playerName={props.location.state.playerName} inGame={false} />
                </div>
                <Invitation roomLink={props.location.state.roomLink} />
            </div>
        );
}

WaitingRoom.propTypes = {
    t: PropTypes.func.isRequired,
    location: PropTypes.shape({
        state: PropTypes.shape({
            playerName: PropTypes.string.isRequired,
            language: PropTypes.string.isRequired
        })
    })
};

export default withNamespaces()(WaitingRoom);