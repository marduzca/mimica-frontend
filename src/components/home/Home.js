import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import './Home.css';

function Home(props) {
    const { t } = props;
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('English');
    const [roomID, setRoomID] = useState('');
    const [auth, setAuth] = useState(false);
    const [nameIsEmpty, setNameIsEmpty] = useState(false);
    const [isHost, setIsHost] = useState(true);

    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        for (let param of query.entries()) {
            if (param[0] === 'room') {
                setIsHost(false);
                setRoomID(param[1]);
            }
        }
    }, [props.location.search]);

    const handleLogin = () => {
        if (isHost) {
            setRoomID(generateRandomString());
        }

        !name.trim() ? setNameIsEmpty(true) : setAuth(true);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
        setNameIsEmpty(false);
    }

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    }

    const generateRandomString = (length = 12) => {
        return Math.random().toString(36).substr(2, length);
    }

    return auth ?
        <Redirect to={{
            pathname: '/waiting-room',
            state: {
                playerName: name,
                language: language,
                roomID: roomID,
                isHost: isHost
            }
        }} />
        : (
            <div>
                <img id="logo" alt="Mimica logo" src={require("./mimica_logo.png")} />
                <div className="login">
                    <div className="input-fields">
                        <input id="name" type="text" placeholder={t('Your name')} value={name} onChange={handleNameChange} />
                        { isHost ?
                            <select id="language" defaultValue="English" onChange={handleLanguageChange}>
                                <option value={t('English')}>{t('English')}</option>
                                <option value={t('Spanish')}>{t('Spanish')}</option>
                            </select>
                            : null }
                    </div>
                    <button id="playButton" onClick={handleLogin}>{ isHost ? t('Play') : t('Join') }</button>
                    {nameIsEmpty ? <p className='error' role='alert'>{t('You need to enter a name!')}</p> : null}
                </div>
            </div>
        );
}

Home.propTypes = {
    t: PropTypes.func.isRequired
};

export default withNamespaces()(Home);