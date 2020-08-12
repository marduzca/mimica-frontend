import React from 'react';
import PropTypes from 'prop-types';
import {withNamespaces} from 'react-i18next';

import './Invitation.css';

function Invitation(props) {
    const {t} = props;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(props.roomLink);
    };

    return (
        <div className="invitation">
            <h2>{t('Invite your friends')}</h2>
            <div className="room-link">
                <span>{props.roomLink}</span>
                <button onClick={copyToClipboard}>{t('Copy')}</button>
            </div>
        </div>
    );
}

Invitation.propTypes = {
    t: PropTypes.func.isRequired,
    roomLink: PropTypes.string.isRequired
}

export default withNamespaces()(Invitation);