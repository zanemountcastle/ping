import React from 'react';
import App from '../../App';

import ShallowRenderer from 'react-test-renderer/shallow';

describe('main entrypoint', () => {
  it('renders without crashing', () => {
    // Shallow render <App /> and not it's child components
    // react-test-renderer doesn't allow shallow rendering
    const renderer = new ShallowRenderer();
    expect(renderer.render(<App />)).toBeTruthy();
  });

  it('renders correctly', () => {
    const renderer = new ShallowRenderer();
    expect(renderer.render(<App />)).toMatchSnapshot();
  });
});
