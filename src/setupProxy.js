const { createProxyMiddleware } = require("http-proxy-middleware");
/*
  dev: https://digital-dev.mashreq.com/
  uat: https://digital-uat.mashreq.com/
*/
const API_URL = "https://digital-uat.mashreq.com/";

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true
    })
  );
};
