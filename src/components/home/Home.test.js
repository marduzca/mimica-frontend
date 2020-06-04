import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter as Router } from 'react-router-dom';

test('User can login and go to waiting-room page', () => {
    const { getByRole, getByPlaceholderText } = render(
        <Router>
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


    expect(location.pathname).toBe('/waiting-room');
});

test('User cannot login with empty name', () => {
    const { getByRole } = render(<Home />);

    const playButton = getByRole('button', { name: 'Play' });
    fireEvent.click(playButton);

    expect(getByRole('alert')).toBeTruthy();
});