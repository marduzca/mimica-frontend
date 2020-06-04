import React, { useState, useEffect } from 'react';

import './GameBar.css';
import { withNamespaces } from 'react-i18next';

function GameBar(props) {
    const { t } = props;
    const [timer, setTimer] = useState(props.time);
    const [currentRound, setCurrentRound] = useState(1);

    useEffect(() => {
        if (timer === 0) {
            setTimer(props.time);
            setCurrentRound(currentRound + 1);
        }
        else {
            setTimeout(
                () => setTimer(timer - 1)
                , 1000);
        }
    }, [timer, props.time, currentRound]);

    return (
        <div className="gamebar">
            <div className="game-info">
                <span className="timer">{timer}</span>
                <span>{t('Round status', { currentRound: currentRound, numberOfRounds: props.numberOfRounds })}</span>
            </div>
            <span className="hint">m _ m _ c _</span>
        </div>
    );
}

export default withNamespaces()(GameBar);