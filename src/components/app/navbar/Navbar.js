import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import i18n from '../../../i18n';

import './Navbar.css';

function Navbar(props) {
    const { t } = props;

    const handleLanguageChange = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
    }

    return (
        <header className="App-header">
            <nav>
                <ul>
                    <Link to="/">
                        <li className="primary-navbar">
                            <img id="logo" alt="Mimica logo" src={require("../mime.png")} />
                            <span>{t('Home')}</span>
                        </li>
                    </Link>
                    <div className="secondary-navbar">
                        <li>
                            <button id="flag" data-testid="language-button" onClick={handleLanguageChange}>
                                <img alt="Switch Language flag" src={i18n.language.match(/en/i) ? require("./es.png") : require("./en.png")} />
                            </button>
                        </li>
                        <li>{t('About')}</li>
                        <li>{t('How to play')}</li>
                        <li>{t('Other remote games')}</li>
                        <li id="bala-easter-egg"><span role="img" aria-label="Music notes">🎶</span> Bala bala bala bala <span role="img" aria-label="Music notes">🎶</span></li>
                    </div>
                </ul>
            </nav>
        </header>
    );
}

Navbar.propTypes = {
    t: PropTypes.func.isRequired
};

export default withNamespaces()(Navbar);