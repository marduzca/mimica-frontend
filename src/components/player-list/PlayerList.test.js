import React from 'react';
import { render } from '@testing-library/react';

import PlayerList from './PlayerList';

test('Player list displays position and points during game', () => {
    const { getAllByTestId } = render(<PlayerList playerName={'Miguel'} inGame={true}/>);

    expect(getAllByTestId('position-text')[0]).toBeInTheDocument();
    expect(getAllByTestId('points-text')[0]).toBeInTheDocument();
});

test('Player list doesn\'t display position and points in waiting room', () => {
    const { queryByTestId } = render(<PlayerList playerName={'Miguel'} inGame={false}/>);

    expect(queryByTestId('position-text')).not.toBeInTheDocument();
    expect(queryByTestId('points-text')).not.toBeInTheDocument();
});


