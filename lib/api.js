const axios = require('axios');
const parseJSON = require('parse-json');

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
      data = data.slice(startIndex + 1, -2);

      let object = null;

      try {
        object = parseJSON(data);
      } catch (error) {
        return reject(error);
      }

      let accommodations = object['data']['objektlista@lagenheter'];

      accommodations = accommodations.map(accommodation => {
        const formattedAccomodation = {
          image: accommodation['bild']['url'],
          address: accommodation['adress'],
          location: accommodation['omrade'],
          paymentType: accommodation['hyraLabel'],
          rent: Number(accommodation['hyra'].replace(/\s/g, '')),
          rentUnit: accommodation['hyraEnhet'],
          type: accommodation['typ'],
          typeUnit: accommodation['typLabel'],
          area: accommodation['yta'],
          available: accommodation['inflyttningDatum'],
          url: accommodation['detaljUrl'],
          text: accommodation['fritext'].replace(/<br>/gi, '\n').replace(/<\/br>/gi, ''),
          publicationTexts: accommodation['publiceringstexter'],
          description: accommodation['egenskaper'][0]['beskrivning'],
          id: Number(accommodation['egenskaper'][0]['id']),
          points: Number(accommodation['poang'].slice(0, -1)),
          advertType: accommodation['annonsTyp'],
          directlyAvailable: false
        };

        for (const item of accommodation['egenskaper']) {
          const regex = /snabb/gi;

          const directlyAvailable = item['id'].match(regex) ||
            item['beskrivning'].match(regex) ||
            item['beskrivningKort'].match(regex);

          if (directlyAvailable) {
            formattedAccomodation.directlyAvailable = true;
            break;
          }
        }

        return formattedAccomodation;
      });

      return resolve(accommodations);
    })
    .catch(reject);
  });
}

module.exports = {
  fetchAccommodations
};
