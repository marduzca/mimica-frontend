import React from 'react';
import App from "./App";
import { fireEvent, render } from "@testing-library/react";

test('Home button in nav bar navigates to home page', () => {
    const { getByText } = render(<App />);

    const homeLink = getByText('Home');
    fireEvent.click(homeLink);

    expect(location.pathname).toBe('/');
});