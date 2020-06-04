import React from 'react';

import './Player.css';
import { withNamespaces } from 'react-i18next';

function Player(props) {
    const { t } = props;

    return (
        <tr className="player" key={props.name}>
            {props.inGame ? <td>#{props.position}</td> : null}
            <td>
                <p>{props.name}</p>
                {props.inGame ? <p>{t('Points', {points: props.points})}</p> : null}
            </td>
        </tr>
    );
}

export default withNamespaces()(Player);