const axios = require("axios");
const sharp = require("sharp");

const BASE_URL = "https://www.speedrun.com/api/v1";
const SERIE = "souls";
const SIZES = [240, 1280];
const DESTINATION = "./src/assets/backgrounds/";

function downloadBackground(game) {
  axios({
    url: game.assets.background.uri,
    method: "get",
    responseType: "arraybuffer"
  }).then(({ data }) => {
    SIZES.forEach(size => {
      sharp(data)
        .resize(size)
        .toFile(`${DESTINATION}/${game.abbreviation}-${size}.jpg`);
    });
  });
}

axios({
  url: `${BASE_URL}/series/${SERIE}/games`,
  method: "get"
}).then(({ data }) => {
  data.data.forEach(downloadBackground);
});
