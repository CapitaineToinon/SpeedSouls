/**
 * Agressive caching using node-cache
 */
const NodeCache = require("node-cache");

module.exports = (stdTTL = 60) => {
  const myCache = new NodeCache({
    stdTTL,
    deleteOnExpire: false
  });

  // middleware
  return (req, res, next) => {
    const key = req.originalUrl;
    let value = myCache.get(key);

    // If value is in cache
    if (value) {
      // Key found, answer to the user before checking if value
      // has expired or not
      res.json(value);

      // update data if expired
      if (Date.now() > myCache.getTtl(key)) {
        // override the json function to not response twice
        res.json = body => {
          myCache.set(key, body);
        };
        next();
      }
    }
    // value isn't already in cache
    else {
      res.jsonHook = res.json;
      res.json = body => {
        myCache.set(key, body);
        res.jsonHook(body);
      };
      next();
    }
  };
};
