import React from 'react';
import { render, getNodeText } from '@testing-library/react';

import Game from './Game';

test('Elements (number of rounds, time) passed from waiting room page are displayed', () => {
    const name = 'Miguel';
    const time = 80;

    const { getByText, getByTestId } = render(
        <Game location={
            {
                state: {
                    playerName: name,
                    language: 'English',
                    numberOfRounds: 3,
                    time: time
                }
            }
        } />
    );

    expect(getByText(name)).toBeInTheDocument();
    expect(Number(getNodeText(getByTestId('timer-display')))).toBe(time);
});

test('Turn ends when count down is over', () => {
    //TODO
    expect(true).toBeTruthy();
});
