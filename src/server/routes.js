const express = require("express");
const cache = require("./cache");
const axios = require("axios");
const router = express.Router();

const speedruncom = "/speedruncom";
router.get(`${speedruncom}*`, cache(60 * 5), async (req, res, next) => {
  try {
    const path = req.path.substring(speedruncom.length, req.path.length);
    const query = Object.keys(req.query).map(key => `${key}=${req.query[key]}`).join('&')
    const json = await axios.get(`https://www.speedrun.com/api/v1${path}?${query}`);
    res.json(json.data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
