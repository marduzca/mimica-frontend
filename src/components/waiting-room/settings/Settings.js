import React, { useState } from 'react';
import { withNamespaces } from 'react-i18next';

import './Settings.css';

const roundsOptions = [3, 4, 5, 6, 7];
const timeOptions = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

function Settings(props) {
    const { t } = props;
    const [numberOfRounds, setNumberOfRounds] = useState(3);
    const [time, setTime] = useState(80);

    const handleNumberOfRoundsChange = (event) => {
        setNumberOfRounds(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value)
    };

    const handleGameStart = () => {
        props.initializeGame(numberOfRounds, time);
    };

    return (
        <div>
            <div className="settings">
                <label htmlFor="rounds">{t('Rounds')}</label>
                <select id="rounds" defaultValue="3" onChange={handleNumberOfRoundsChange}>
                    {roundsOptions.map(rounds => <option key={rounds} value={rounds}>{rounds}</option>)};
                </select>

                <label htmlFor="time">{t('Time in seconds')}</label>
                <select id="time" defaultValue="80" onChange={handleTimeChange}>
                    {timeOptions.map(time => <option key={time} value={time}>{time}</option>)};
                </select>

                <p>{t('Language', { language: props.language })}</p>

                <button id="startButton" onClick={handleGameStart}>{t('Start game')}</button>
            </div>
        </div>
    );
}

export default withNamespaces()(Settings);