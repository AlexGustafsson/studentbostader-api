# Studentbostäder API for Node JS
### A fully async API written in ES6 for retrieval of student accommodations
***
![npm badge](https://img.shields.io/npm/v/studentbostader-api.svg)

### Setting up

##### Installing

```
npm install studentbostader-api
```

##### Quickstart

```JavaScript
const api = require('studentbostader-api');

// Fetch all available accommodations
api.fetchAccommodations()
.then(accommodations => {
  for (const accommodation of accommodations) {
    console.log(accommodation.address);
  }
});
```

### Available values

| property | description | type | note |
| -------- | ----------- | ---- | ---- |
| image | An url to an image of the listing | string |  |
| address | The address | string |  |
| location | The name of the neighborhood / location | string |  |
| paymentType | Text explaining type of payment | string | I.e "Hyra" (monthly rent) |
| rent | The cost of the payment | number |  |
| rentUnit | Unit of `rent` | string | Typically 'kr/mån' |
| type | Type of accommodation | string | I.e. 'Korridorsrum', 'Lägenhet' |
| typeUnit | Unit of `type` | string | Typically 'Storlek/Typ' |
| area | Number of square meters | number |  |
| available | Date of availability | string | In the 'YYYY-MM-DD' format. I.e. '2017-05-01' |
| url | Url to the listing | string |  |
| text | Text related to the listing | string | Usually "sells" the location and accommodation |
| publicationTexts | List of texts related to the listing | array of strings | Unkown usage | 
| description | Usually a short description of the listing | string | I.e. 'Ej möblerad' |
| id | Id of the listing | number | Unknown usage |
| points | Required queue points to be eligible | number |  |
| advertType |  |  | Unknown usage |

### Contributing

Any contribution is welcome. If you're not able to code it yourself, perhaps someone else is - so post an issue if there's anything on your mind.

###### Development

Clone the repository:
```
git clone https://github.com/AlexGustafsson/studentbostader-api.git && cd studentbostader-api
```

Set up for development:
```
npm install
```

Follow the conventions enforced:
```
npm test
```

### Disclaimer

_Although the project is very capable, it is not built with production in mind. Therefore there might be complications when trying to use the API for large-scale projects meant for the public. The API was created to easily fetch available student accommodations programmatically and as such it might not promote best practices nor be performant. This project is not in any way affiliated with Studentbostäder._
