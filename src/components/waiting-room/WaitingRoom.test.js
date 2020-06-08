import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import WaitingRoom from './WaitingRoom';

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

    expect(getByText(/Miguel/i)).toBeInTheDocument();
    expect(getByText(/Language/i)).toBeInTheDocument();
    expect(getByText('https://mimica.com/?xweLh250oNmm')).toBeInTheDocument();
});

test('User can start the game with default settings', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
        <Router history={history}>
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

    expect(history.location.pathname).toBe('/game');
    expect(history.location.state.playerName).toBe('Miguel');
    expect(history.location.state.language).toBe('English');
    expect(history.location.state.time).toBe(80);
    expect(history.location.state.numberOfRounds).toBe(3);
});

test('User can start the game with custom settings', () => {
    const history = createMemoryHistory();
    const { getByRole, getByTestId } = render(
        <Router history={history}>
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

    fireEvent.change(getByTestId('round-select'), {
        target: {value: 5}
    });

    fireEvent.change(getByTestId('time-select'), {
        target: {value: 100}
    });

    const startGameButton = getByRole('button', { name: 'Start game' });
    fireEvent.click(startGameButton);

    expect(history.location.pathname).toBe('/game');
    expect(history.location.state.time).toBe(100);
    expect(history.location.state.numberOfRounds).toBe(5);
});
