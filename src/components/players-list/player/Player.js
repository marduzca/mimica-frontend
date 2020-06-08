import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import './Player.css';

function Player(props) {
    const { t } = props;

    return (
        <li className="player" key={props.name}>
            {props.inGame ? <span>#{props.position}</span> : null}
            <span>
                <p>{props.name}</p>
                {props.inGame ? <p>{t('Points', {points: props.points})}</p> : null}
            </span>
        </li>
    );
}

Player.propTypes = {
    t: PropTypes.func.isRequired,
    inGame: PropTypes.bool.isRequired
};

export default withNamespaces()(Player);