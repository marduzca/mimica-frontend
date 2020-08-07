import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import WaitingRoom from './WaitingRoom';

test('Elements (language and link) passed from home page are displayed', () => {
    render(
        <WaitingRoom location={
            {
                state: {
                    playerName: 'Miguel',
                    language: 'English',
                    roomID: 'xweLh250oNmm',
                    isHost: true
                }
            }
        } />
    );

    expect(screen.getByText(/Miguel/i)).toBeInTheDocument();
    expect(screen.getByText(/Language/i)).toBeInTheDocument();
    expect(screen.getByText(/room=xweLh250oNmm/i)).toBeInTheDocument();
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
                        roomLink: 'https://mimica.com/?xweLh250oNmm',
                        isHost: true
                    }
                }
            } />
        </Router>
    );

    const startGameButton = screen.getByRole('button', { name: 'Start game' });
    fireEvent.click(startGameButton);

    expect(history.location.pathname).toBe('/game');
    expect(history.location.state.language).toBe('English');
    expect(history.location.state.time).toBe(80);
    expect(history.location.state.numberOfRounds).toBe(3);
    expect(history.location.state.currentPlayers).toEqual(
        [{
            id: 'provisionalID',
            name: 'Miguel',
            host: true
        }]
    );
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
                        roomLink: 'https://mimica.com/?xweLh250oNmm',
                        isHost: true
                    }
                }
            } />
        </Router>


    );

    userEvent.selectOptions(screen.getByLabelText('Rounds'), '5');

    userEvent.selectOptions(screen.getByLabelText('Time in seconds'), '100');

    const startGameButton = screen.getByRole('button', { name: 'Start game' });
    fireEvent.click(startGameButton);

    expect(history.location.pathname).toBe('/game');
    expect(history.location.state.time).toBe(100);
    expect(history.location.state.numberOfRounds).toBe(5);
});

test('Game settings are not updateable for guests', () => {
    render(
        <BrowserRouter>
            <WaitingRoom location={
                {
                    state: {
                        playerName: 'Miguel',
                        language: 'English',
                        roomLink: 'https://mimica.com/?xweLh250oNmm',
                        isHost: false
                    }
                }
            } />
        </BrowserRouter>
    );

    const roundOptions = screen.getByLabelText('Rounds');
    const timeOptions = screen.getByLabelText('Time in seconds');
    const startGameButton = screen.getByRole('button', { name: 'Start game' });

    expect(roundOptions).toBeDisabled();
    expect(timeOptions).toBeDisabled();
    expect(startGameButton).toBeDisabled();
});