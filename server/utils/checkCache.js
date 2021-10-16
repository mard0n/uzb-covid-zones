module.exports = function (redis) {
  return function checkCache(req, res, next) {
    if (redis.connected) {
      redis.get("zones", (err, data) => {
        console.log("cache res", err, data);
        if (err) next();

        data !== null ? res.send(data) : next();
      });
    } else {
      next();
    }
  };
};
