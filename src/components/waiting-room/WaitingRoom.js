import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import Settings from './settings/Settings';
import Invitation from './invitation/Invitation';
import PlayerList from '../player-list/PlayerList';
import socket from '../../webSocket';

import './WaitingRoom.css';

function WaitingRoom(props) {
    const { t } = props;
    const [startGame, setStartGame] = useState(false);
    const [numberOfRounds, setNumberOfRounds] = useState(3);
    const [time, setTime] = useState(80);
    const [currentPlayers, setCurrentPlayers] = useState(
        [{
            name: props.location.state.playerName,
            host: props.location.state.isHost
        }]
    );

    useEffect(() => {
        socket.emit('newPlayer', {
            roomID: props.location.state.roomID,
            name: props.location.state.playerName,
            id: socket.id
        });

        socket.on('currentPlayers', (players) => {
            setCurrentPlayers(players);
        });

    }, [props.location.state.playerName, props.location.state.roomID]);

    useEffect(() => {
        window.addEventListener('unload', () => {
            socket.emit('remove', {
                roomID: props.location.state.roomID,
                id: socket.id
            });
        });
    }, [props.location.state.roomID])

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
                        <Settings language={props.location.state.language} initializeGame={initializeGame} isHost={props.location.state.isHost} />
                    </div>
                    <PlayerList currentPlayers={currentPlayers} inGame={false} />
                </div>
                <Invitation roomLink={process.env.REACT_APP_MIMICA_URL + `?room=${props.location.state.roomID}`} />
            </div>
        );
}

WaitingRoom.propTypes = {
    t: PropTypes.func.isRequired,
    location: PropTypes.shape({
        state: PropTypes.shape({
            playerName: PropTypes.string.isRequired,
            language: PropTypes.string.isRequired,
            isHost: PropTypes.bool.isRequired
        })
    })
};

export default withNamespaces()(WaitingRoom);