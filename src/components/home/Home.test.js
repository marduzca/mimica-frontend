import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Home from './Home';

test('User can login and go to waiting-room page', () => {
    const history = createMemoryHistory();
    const { getByRole, getByPlaceholderText } = render(
        <Router history={history}>
            <Home />
        </Router>
    );

    const nameInput = getByPlaceholderText('Your name');
    fireEvent.change(nameInput, {
        target: {
            value: 'Miguel'
        }
    });

    const playButton = getByRole('button', { name: 'Play' });
    fireEvent.click(playButton);

    expect(history.location.pathname).toBe('/waiting-room');
    expect(history.location.state.playerName).toBe('Miguel');
    expect(history.location.state.language).toBe('English');
});

test('User cannot login with empty name', () => {
    const { getByRole } = render(<Home />);

    const playButton = getByRole('button', { name: 'Play' });
    fireEvent.click(playButton);

    expect(getByRole('alert')).toBeTruthy();
});