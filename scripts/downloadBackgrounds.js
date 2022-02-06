require('dotenv').config();
const axios = require('axios');
const sharp = require('sharp');

const BASE_URL = `${process.env.VITE_APP_SPEEDRUNCOM}/api/v1`;
const SERIE = 'souls';
const SIZES = [240, 1280];
const DESTINATION = './public/img/backgrounds';

function downloadBackground(game) {
  axios({
    url: game.assets.background.uri,
    method: 'get',
    responseType: 'arraybuffer',
  }).then(({ data }) => {
    SIZES.forEach((size) => {
      sharp(data)
        .resize(size)
        .toFile(`${DESTINATION}/${game.abbreviation}-${size}.jpg`);
    });
  });
}

axios({
  url: `${BASE_URL}/series/${SERIE}/games`,
  method: 'get',
}).then(({ data }) => {
  data.data.forEach(downloadBackground);
});
