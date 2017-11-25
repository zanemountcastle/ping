import React from 'react';
import Activity from '../../src/containers/Activity';

import ShallowRenderer from 'react-test-renderer/shallow';

describe('activity screen', () => {

  it('renders without crashing', () => {
    // Shallow render <App /> and not it's child components
    // Standard react-test-renderer doesn't allow shallow rendering
    const renderer = new ShallowRenderer();
    expect(renderer.render(<Activity />)).toBeTruthy();
  });

  it('renders correctly', () => {
    const renderer = new ShallowRenderer();
    expect(renderer.render(<Activity />)).toMatchSnapshot();
  });

});
