import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import './Player.css';

function Player(props) {
    const { t } = props;

    return (
        <li className="player" key={props.name}>
            {props.inGame ? <span data-testid="position-text">#{props.position}</span> : null}
            <span>
                {props.isHost ? <img id="crown" alt="Host crown" src={require("./crown.png")} /> : null}
                <span>{props.name}</span>
            </span>
            {props.inGame ? <p data-testid="points-text">{t('Points', { points: props.points })}</p> : null}
        </li>
    );
}

Player.propTypes = {
    t: PropTypes.func.isRequired,
    inGame: PropTypes.bool.isRequired
};

export default withNamespaces()(Player);