const axios = require('axios');

const ACCOMMODATIONS_URL = 'https://marknad.studentbostader.se/widgets/?callback=jQuery17107682559337031063_1491336710625&widgets%5B%5D=koerochprenumerationer%40STD&widgets%5B%5D=objektfilter%40lagenheter&widgets%5B%5D=objektsortering%40lagenheter&widgets%5B%5D=objektlista%40lagenheter&widgets%5B%5D=pagineringgonew%40lagenheter&widgets%5B%5D=pagineringlista%40lagenheter&widgets%5B%5D=pagineringgoold%40lagenheter&_=1491336710898';

function fetch(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
    .then(response => {
      if (response.status !== 200)
        return reject(new Error('Could not GET url'));

      resolve(response.data);
    })
    .catch(reject);
  });
}

function fetchAccommodations() {
  return new Promise((resolve, reject) => {
    fetch(ACCOMMODATIONS_URL)
    .then(data => {
      const startIndex = data.indexOf('(');
      data = data.substr(startIndex + 1, data.length - 3 - startIndex);

      const object = null;

      try {
        JSON.parse(data);
      } catch (error) {
        return reject(error);
      }

      let accommodations = object['data']['objektlista@lagenheter'];

      accommodations = accommodations.map(accommodation => {
        return {
          image: accommodation['bild']['url'],
          address: accommodation['adress'],
          location: accommodation['område'],
          paymentType: accommodation['hyraLabel'],
          rent: accommodation['hyra'],
          rentUnit: accommodation['hyraEnhet'],
          type: accommodation['typ'],
          typeUnit: accommodation['typLabel'],
          area: accommodation['yta'],
          available: accommodation['inflyttningDatum'],
          url: accommodation['detaljUrl'],
          text: accommodation['fritext'],
          publicationTexts: accommodation['publiceringstexter'],
          description: accommodation['egenskaper']['beskrivning'],
          id: accommodation['egenskaper']['id'],
          points: accommodation['poang'],
          advertType: accommodation['annonsTyp']
        };
      });

      return Promise.resolve(accommodations);
    })
    .catch(reject);
  });
}

module.exports = {
  fetchAccommodations
};
