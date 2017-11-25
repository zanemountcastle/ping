import React from 'react';
import Applets from '../../src/containers/Applets';

import ShallowRenderer from 'react-test-renderer/shallow';

describe('my applets screen', () => {

  it('renders without crashing', () => {
    // Shallow render <App /> and not it's child components
    // Standard react-test-renderer doesn't allow shallow rendering
    const renderer = new ShallowRenderer();
    expect(renderer.render(<Applets />)).toBeTruthy();
  });

  it('renders correctly', () => {
    const renderer = new ShallowRenderer();
    expect(renderer.render(<Applets />)).toMatchSnapshot();
  });

});
