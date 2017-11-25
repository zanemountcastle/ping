import React from 'react';
import { getFeeds } from '../../src/lib/Fetch';

describe('utilities', () => {

  it('getFeeds() fetches data asynchronously', async () => {
    expect.assertions(1);
    const data = await getFeeds();
    expect(data).toBeTruthy(); // There should be some data
  });

});
