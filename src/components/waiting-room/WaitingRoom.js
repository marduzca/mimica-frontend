import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import io from 'socket.io-client';

import Settings from './settings/Settings';
import Invitation from './invitation/Invitation';
import PlayerList from '../player-list/PlayerList';

import './WaitingRoom.css';

function WaitingRoom(props) {
    const { t } = props;
    const [startGame, setStartGame] = useState(false);
    const [numberOfRounds, setNumberOfRounds] = useState(3);
    const [time, setTime] = useState(80);
    const [currentPlayers, setCurrentPlayers] = useState([]);

    const socket = useRef();

    useEffect(() => {
        socket.current = io.connect(process.env.REACT_APP_MIMICA_BACKEND_URL);

        socket.current.on('connect', () => {
            socket.current.emit('player', {
                roomID: props.location.state.roomID,
                name: props.location.state.playerName,
                id: socket.current.id
            });
        });

        socket.current.on('allUsers', (players) => {
            setCurrentPlayers(players);
        });

        window.addEventListener("beforeunload", () => {
            socket.current.emit('remove', {
                roomID: props.location.state.roomID,
                id: socket.current.id
            });
        });

    }, [props.location.state.playerName, props.location.state.roomID]);

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
            language: PropTypes.string.isRequired
        })
    })
};

export default withNamespaces()(WaitingRoom);