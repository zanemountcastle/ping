import React from 'react';
import Search from '../../src/containers/Search';

import ShallowRenderer from 'react-test-renderer/shallow';

describe('search screen', () => {

  it('renders without crashing', () => {
    // Shallow render <App /> and not it's child components
    // Standard react-test-renderer doesn't allow shallow rendering
    const renderer = new ShallowRenderer();
    expect(renderer.render(<Search />)).toBeTruthy();
  });

  it('renders correctly', () => {
    const renderer = new ShallowRenderer();
    expect(renderer.render(<Search />)).toMatchSnapshot();
  });

});
