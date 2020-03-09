const { createProxyMiddleware } = require("http-proxy-middleware");

const API_URL = "https://digital-dev.mashreq.com/";

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true
    })
  );
};
