import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Home from './Home';

test('User can login and go to waiting-room page', () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <Home location={{ search:  'mimica.herokuapp.com/'}} />
        </Router>
    );

    const nameInput = screen.getByPlaceholderText('Your name');
    fireEvent.change(nameInput, {
        target: {
            value: 'Miguel'
        }
    });

    const playButton = screen.getByRole('button', { name: 'Play' });
    fireEvent.click(playButton);

    expect(history.location.pathname).toBe('/waiting-room');
    expect(history.location.state.playerName).toBe('Miguel');
    expect(history.location.state.language).toBe('English');
});

test('User cannot login with empty name', () => {
    render(<Home location={{ search:  'mimica.herokuapp.com/'}} />);

    const playButton = screen.getByRole('button', { name: 'Play' });
    fireEvent.click(playButton);

    expect(screen.getByRole('alert')).toBeTruthy();
});