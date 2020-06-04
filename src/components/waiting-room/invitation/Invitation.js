import React from 'react';

import './Invitation.css';
import { withNamespaces } from 'react-i18next';

function Invitation(props) {
    const { t } = props;

    const copyToClipboard = e => {
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

export default withNamespaces()(Invitation);