/*
 * Simulates a slow connection to fetch feed data
 */

import { feeds } from '../../static/data';

export const getFeeds = () => {
  return new Promise((resolve, reject) => {
    setTimeout(function(){ // Simulate terribly slow connection
      return resolve(feeds);
    }, 3000);
  });
};
