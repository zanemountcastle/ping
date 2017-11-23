import React from 'react';
import AppletFeed from '../../src/components/AppletsFeed';
import { feeds } from '../../static/data.js';

jest.useFakeTimers();

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

  // it('renders correctly over time', () => {
  //   timerGame();
  //
  //   expect(setTimeout.mock.calls.length).toBe(1);
  //   expect(setTimeout.mock.calls[0][1]).toBe(1000);
  // });
  // it('renders 3 times', () => {
  //   // const timerGame = require('../../src/components/AppletsFeed');
  //   const view = renderer.create(<AppletFeed feeds={feeds} />).toJSON();
  //   jest.advanceTimersByTime(1000); // in jest 21.3.0 advanced timer capability
  //   expect(setTimeout.mock.calls.length).toBe(3);
  //   expect(setTimeout.mock.calls[0][1]).toBe(1000);
  // });

});
