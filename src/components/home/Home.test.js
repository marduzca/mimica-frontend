import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import Home from './Home';

test('User can login and go to waiting-room page', () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <Home location={{ search: '' }} />
        </Router>
    );

    const nameInput = screen.getByPlaceholderText('Your name');
    userEvent.type(nameInput, 'Miguel');

    const playButton = screen.getByRole('button', { name: 'Play' });
    userEvent.click(playButton);

    expect(history.location.pathname).toBe('/waiting-room');
    expect(history.location.state.playerName).toBe('Miguel');
    expect(history.location.state.language).toBe('English');
});

test('User cannot login with empty name', () => {
    render(<Home location={{ search: '' }} />);

    const playButton = screen.getByRole('button', { name: 'Play' });
    userEvent.click(playButton);

    expect(screen.getByRole('alert')).toBeTruthy();
});

test('Button displays correct button message when use is host', () => {
    render(<Home location={{ search: '' }} />);

    expect(screen.getByRole('button', { name: 'Play' })).toBeTruthy();
});

test('Button displays correct button message when use is NOT host', () => {
    render(<Home location={{ search: '?room=p9bm6uwfr8c' }} />);

    expect(screen.getByRole('button', { name: 'Join' })).toBeTruthy();
});