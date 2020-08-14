import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

// import GameBar from './gamebar/GameBar';
// import PlayerList from '../player-list/PlayerList';
import VideoCamera from './videocam/VideoCamera';
import Chat from './chat/Chat';
import socket from '../../webSocket';

import './Game.css';

function Game(props) {
    // const [currentPlayers, setCurrentPlayers] = useState(props.location.state.currentPlayers);
    const isHost = () => {
        const query = new URLSearchParams(props.location.search);

        for (let param of query.entries()) {
            if (param[0]) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    useEffect(() => {
        socket.on('currentPlayers', (players) => {
            // setCurrentPlayers(players);
        });

    }, []);

    return (
        <div className="game">
            {/*<GameBar time={props.location.state.time} numberOfRounds={props.location.state.numberOfRounds}/>*/}
            <div className="gameplay">
                {/*<PlayerList currentPlayers={currentPlayers} inGame={true}/>*/}
                {/*<VideoCamera host={props.location.state.isHost} currentPlayers={currentPlayers} roomID={props.location.state.roomID} />*/}
                <VideoCamera host={isHost()} />
                <Chat/>
            </div>
        </div>
    );
}

Game.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            currentPlayers: PropTypes.array.isRequired,
            language: PropTypes.string.isRequired,
            numberOfRounds: PropTypes.number.isRequired,
            time: PropTypes.number.isRequired,
            isHost: PropTypes.bool.isRequired,
            roomID: PropTypes.string.isRequired
        })
    })
};

export default Game;