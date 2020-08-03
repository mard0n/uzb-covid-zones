module.exports = function (redis) {
  return function checkCache(req, res, next) {
    console.log("redis", redis);
    if (redis) {
      redis.get("zones", (err, data) => {
        if (err) throw err;

        if (data !== null) {
          res.send(data);
        } else {
          next();
        }
      });
    } else {
      next();
    }
  };
};
