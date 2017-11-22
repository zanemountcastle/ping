import React from 'react';
import AppletHeader from '../../src/components/AppletsHeader';

import renderer from 'react-test-renderer';

describe('applet preview', () => {

  it('renders without crashing', () => {
    const rendered = renderer.create(<AppletHeader />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<AppletHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
