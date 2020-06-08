import React from 'react';
import { render, fireEvent } from '@testing-library/react';

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
    const roomLink = 'https://mimica.com/?xweLh250oNmm';
    const { getByRole } = render(<Invitation roomLink={roomLink} />);

    const copyButton = getByRole('button', { name: 'Copy' });
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(roomLink);
});