import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import i18n from '../../../i18n';


function Navbar({ t }) {
    const handleLanguageChange = e => {
        i18n.changeLanguage(e.target.value);
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
                        <select onChange={handleLanguageChange}>
                            <option value="en">en</option>
                            <option value="es">es</option>
                        </select>
                    </li>
                    <li>{t('About')}</li>
                    <li>{t('How to play')}</li>
                    <li>{t('Other remote games')}</li>
                </div>
            </ul>
        </nav>
    );
}

export default withNamespaces()(Navbar);