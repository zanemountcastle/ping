import React from 'react';
import AppletFeed from '../../src/components/AppletsFeed';
import { feeds } from '../../static/data.js';

import renderer from 'react-test-renderer';

describe('applet preview', () => {

  it('renders without crashing', () => {
    const rendered = renderer.create(<AppletFeed feeds={feeds} />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<AppletFeed feeds={feeds} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
