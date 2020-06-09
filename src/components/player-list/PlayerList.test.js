import React from 'react';
import { render, screen } from '@testing-library/react';

import PlayerList from './PlayerList';

test('Player list displays position and points during game', () => {
    render(<PlayerList playerName={'Miguel'} inGame={true}/>);

    expect(screen.getAllByTestId('position-text')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('points-text')[0]).toBeInTheDocument();
});

test('Player list doesn\'t display position and points in waiting room', () => {
    render(<PlayerList playerName={'Miguel'} inGame={false}/>);

    expect(screen.queryByTestId('position-text')).not.toBeInTheDocument();
    expect(screen.queryByTestId('points-text')).not.toBeInTheDocument();
});


