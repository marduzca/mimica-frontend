import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import i18n from '../../../i18n';


function Navbar(props) {
    const { t } = props;

    const handleLanguageChange = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
    }

    return (
        <nav>
            <ul>
                <Link to="/">
                    <li className="primary-navbar">
                        <img id="logo" alt="Mimica logo" src={require("../favicon.ico")} />
                        <span>{t('Home')}</span>
                    </li>
                </Link>
                <div className="secondary-navbar">
                    <li>
                        <button id="flag" onClick={handleLanguageChange}>
                            <img alt="Switch Language flag" src={i18n.language.match(/en/i) ? require("./es.png") : require("./en.png")} />
                        </button>
                    </li>
                    <li>{t('About')}</li>
                    <li>{t('How to play')}</li>
                    <li>{t('Other remote games')}</li>
                    <li id="bala-easter-egg">Bala bala bala bala</li>
                </div>
            </ul>
        </nav>
    );
}

export default withNamespaces()(Navbar);