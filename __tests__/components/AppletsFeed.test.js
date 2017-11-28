import React from 'react';
import AppletFeed from '../../src/components/AppletsFeed';
import { feeds } from '../../static/data.js';

jest.useFakeTimers();

import renderer from 'react-test-renderer';

describe('applet preview', () => {

  it('renders without crashing', () => {
    const rendered = renderer.create(
      <AppletFeed
        feed={[]}
        fetchApplets={()=>{[]}}
        isFetching={false}
      />
      ).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <AppletFeed
        feed={[]}
        fetchApplets={()=>{[]}}
        isFetching={false}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
