const test = require('ava').test;

const api = require('../lib/api');

test.cb('Fetching student accommodations', t => {
  api.fetchAccommodations()
  .then(accommodations => {
    t.is(Array.isArray(accommodations), true);
    if (accommodations[0]) {
      const accommodation = accommodations[0];
      t.is(typeof accommodation, 'object');
      t.is(typeof accommodation.id, 'number');
      t.is(typeof accommodation.rent, 'number');
      t.end();
    }
  }).catch(t.fail);
});
