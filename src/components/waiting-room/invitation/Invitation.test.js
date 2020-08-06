import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import Invitation from './Invitation';

const { clipboard } = navigator;

beforeAll(() => {
  delete navigator.clipboard;
  navigator.clipboard = { writeText: jest.fn() };
});

afterAll(() => {
    navigator.clipboard = clipboard;
});

test('Right value is copied to the clipboard', () => {
    const roomLink = 'http://mimica.herokuapp.com/?room=xweLh250oNmm';
    render(<Invitation roomLink={roomLink} />);

    const copyButton = screen.getByRole('button', { name: 'Copy' });
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(roomLink);
});