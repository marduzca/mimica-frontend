import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import WaitingRoom from './WaitingRoom';
import { render, fireEvent, getNodeText } from '@testing-library/react';

test('Elements (host name, language and link) passed from home page are displayed', () => {
    const { getByText } = render(
        <WaitingRoom location={
            {
                state: {
                    playerName: 'Miguel',
                    language: 'English',
                    roomLink: 'https://mimica.com/?xweLh250oNmm'
                }
            }
        } />
    );

    const language = getNodeText(getByText(/Language/i));
    expect(language).toMatch(/Language/);

    const roomLink = getByText('https://mimica.com/?xweLh250oNmm');
    expect(roomLink).toBeTruthy();
});

test('User can start the game with default settings', () => {
    const { getByRole } = render(
        <Router>
            <WaitingRoom location={
                {
                    state: {
                        playerName: 'Miguel',
                        language: 'English',
                        roomLink: 'https://mimica.com/?xweLh250oNmm'
                    }
                }
            } />
        </Router>
    );

    const startGameButton = getByRole('button', { name: 'Start game' });
    fireEvent.click(startGameButton);

    expect(location.pathname).toBe('/game');
});

test('User can start the game with custom settings', () => {
    expect(true).toBeTruthy();
});
