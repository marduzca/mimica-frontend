import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import WaitingRoom from './WaitingRoom';

test('Elements (host name, language and link) passed from home page are displayed', () => {
    render(
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

    expect(screen.getByText(/Miguel/i)).toBeInTheDocument();
    expect(screen.getByText(/Language/i)).toBeInTheDocument();
    expect(screen.getByText('https://mimica.com/?xweLh250oNmm')).toBeInTheDocument();
});

test('User can start the game with default settings', () => {
    const history = createMemoryHistory();
    render(
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

    const startGameButton = screen.getByRole('button', { name: 'Start game' });
    fireEvent.click(startGameButton);

    expect(history.location.pathname).toBe('/game');
    expect(history.location.state.playerName).toBe('Miguel');
    expect(history.location.state.language).toBe('English');
    expect(history.location.state.time).toBe(80);
    expect(history.location.state.numberOfRounds).toBe(3);
});

test('User can start the game with custom settings', () => {
    const history = createMemoryHistory();
    render(
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

    userEvent.selectOptions(screen.getByTestId('round-select'), '5');

    userEvent.selectOptions(screen.getByTestId('time-select'), '100');

    const startGameButton = screen.getByRole('button', { name: 'Start game' });
    fireEvent.click(startGameButton);

    expect(history.location.pathname).toBe('/game');
    expect(history.location.state.time).toBe(100);
    expect(history.location.state.numberOfRounds).toBe(5);
});
