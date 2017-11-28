import React from 'react';

// Get named component, not default
import { Applets } from '../../src/containers/Applets';

import ShallowRenderer from 'react-test-renderer/shallow';

describe('my applets screen', () => {

  // Mock props that would be passed from Redux
  const appletsProps = {
    applets: {
      isFetching: false,
      data: [],
      errorMessage: null,
      hasError: false
    },
    FetchAppletData: () => {[]}
  }

  it('renders without crashing', () => {
    // Shallow render <Applets /> and not it's child components
    // Standard react-test-renderer doesn't allow shallow rendering
    const renderer = new ShallowRenderer();
    expect(renderer.render(<Applets {...appletsProps} />)).toBeTruthy();
  });

  it('renders correctly', () => {
    const renderer = new ShallowRenderer();
    expect(renderer.render(<Applets {...appletsProps} />)).toMatchSnapshot();
  });

});
