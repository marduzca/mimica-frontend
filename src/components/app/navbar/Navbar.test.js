import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import Navbar from './Navbar';
import i18n from 'i18n';

test('Language can be switched by clicking on the flags', () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <Navbar/>
        </Router>
    );

    const languageButton = screen.getByTestId('language-button');

    fireEvent.click(languageButton);    //Switch to English
    expect(i18n.language).toBe('en');

    fireEvent.click(languageButton);    //Switch to Spanish
    expect(i18n.language).toBe('es');
});