import React, { useState } from 'react';
import { withNamespaces } from 'react-i18next';

import './Settings.css';

const roundsOptions = [3, 4, 5, 6, 7];

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
                    {roundsOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)};
                </select>

                <label htmlFor="time">{t('Time in seconds')}</label>
                <select id="time" defaultValue="80" onChange={handleTimeChange}>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                    <option value="70">70</option>
                    <option value="80">80</option>
                    <option value="90">90</option>
                    <option value="100">100</option>
                    <option value="110">110</option>
                    <option value="120">120</option>
                </select>

                <p>{t('Language', { language: props.language })}</p>

                <button id="startButton" onClick={handleGameStart}>{t('Start game')}</button>
            </div>
        </div>
    );
}

export default withNamespaces()(Settings);