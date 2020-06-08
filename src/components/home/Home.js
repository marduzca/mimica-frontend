import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import './Home.css';

function Home(props) {
    const { t } = props;
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('English');
    const [auth, setAuth] = useState(false);
    const [nameIsEmpty, setNameIsEmpty] = useState(false);

    const handleLogin = () => {
        !name.trim() ? setNameIsEmpty(true) : setAuth(true);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
        setNameIsEmpty(false);
    }

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    }

    return auth ?
        <Redirect to={{
            pathname: "/waiting-room",
            state: {
                playerName: name,
                language: language,
                roomLink: 'https://mimica.com/?xweLh250oNmm'
            }
        }} />
        : (
            <div>
                <img id="logo" alt="Mimica logo" src={require("./mimica_logo.png")} />
                <div className="login">
                    <div className="input-fields">
                        <input id="name" type="text" placeholder={t('Your name')} value={name} onChange={handleNameChange} />
                        <select id="language" defaultValue="English" onChange={handleLanguageChange}>
                            <option value={t('English')}>{t('English')}</option>
                            <option value={t('Spanish')}>{t('Spanish')}</option>
                        </select>
                    </div>
                    <button id="playButton" onClick={handleLogin}>{t('Play')}</button>
                    {nameIsEmpty ? <p className='error' role='alert'>{t('You need to enter a name!')}</p> : null}
                </div>
            </div>
        );
}

Home.propTypes = {
    t: PropTypes.func.isRequired
};

export default withNamespaces()(Home);