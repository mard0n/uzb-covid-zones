module.exports = function serveCompressed(req, res, next) {
  if (req.header("Accept-Encoding").includes("br")) {
    req.url = req.url + ".br";
    res.set("Content-Encoding", "br");
  } else if (req.header("Accept-Encoding").includes("gzip")) {
    req.url = req.url + ".gz";
    res.set("Content-Encoding", "gzip");
  }
  next();
};
