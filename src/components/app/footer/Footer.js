import React from 'react';
import { withNamespaces } from 'react-i18next';

import './Footer.css';

function Footer(props) {
    const { t } = props;

    return (
        <footer>
            <ul>
                <li>{t('Contact')}</li>
                <li>{t('Terms of service')}</li>
            </ul>
        </footer>
    );
}

export default withNamespaces()(Footer);