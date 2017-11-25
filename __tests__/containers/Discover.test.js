import React from 'react';
import Discover from '../../src/containers/Discover';

import ShallowRenderer from 'react-test-renderer/shallow';

describe('discover screen', () => {

  it('renders without crashing', () => {
    // Shallow render <App /> and not it's child components
    // Standard react-test-renderer doesn't allow shallow rendering
    const renderer = new ShallowRenderer();
    expect(renderer.render(<Discover />)).toBeTruthy();
  });

  it('renders correctly', () => {
    const renderer = new ShallowRenderer();
    expect(renderer.render(<Discover />)).toMatchSnapshot();
  });

});
