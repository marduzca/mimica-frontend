import React from 'react';
import { render, screen, within } from '@testing-library/react';

import PlayerList from './PlayerList';

test('Player list displays all players', () => {
    render(<PlayerList currentPlayers={
        [{
            name: 'Miguel',
            host: true
        },
        {
            name: 'Friend',
            host: false
        }]
    } inGame={false} />);

    expect(screen.getByTestId(/miguel/i)).toBeInTheDocument();
    expect(screen.getByTestId(/friend/i)).toBeInTheDocument();
});

test('Player list properly shows who is host and who is not', () => {
    render(<PlayerList currentPlayers={
        [{
            name: 'Miguel',
            host: true
        },
        {
            name: 'Friend',
            host: false
        }]
    } inGame={false} />);

    const hostPlayer = screen.getByTestId(/miguel/i);
    const nonHostPlayer = screen.getByTestId(/friend/i);

    expect(within(hostPlayer).queryByAltText(/Host/i)).toBeInTheDocument();
    expect(within(nonHostPlayer).queryByAltText(/Host/i)).not.toBeInTheDocument();
});

test('Player list displays position and points during game', () => {
    render(<PlayerList currentPlayers={[{ name: 'Miguel', host: true }]} inGame={true} />);

    expect(screen.getAllByTestId('position-text')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('points-text')[0]).toBeInTheDocument();
});

test('Player list doesn\'t display position and points in waiting room', () => {
    render(<PlayerList currentPlayers={[{ name: 'Miguel', host: true }]} inGame={false} />);

    expect(screen.queryByTestId('position-text')).not.toBeInTheDocument();
    expect(screen.queryByTestId('points-text')).not.toBeInTheDocument();
});


