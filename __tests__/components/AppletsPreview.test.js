import React from 'react';
import AppletPreview from '../../src/components/AppletPreview';
import { feeds } from '../../static/data.js';

import renderer from 'react-test-renderer';

describe('applet preview', () => {

  it('renders without crashing', () => {
    const rendered = renderer.create(<AppletPreview applet={feeds[0]} />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<AppletPreview applet={feeds[0]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
