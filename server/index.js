const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const RedisClustr = require('redis-clustr');
// const redis = require("redis");
const path = require("path");
const serveCompressed = require("./utils/serveCompressed");
require("dotenv").config();

const app = express();
// let client = redis.createClient(process.env.REDIS_URL || 6379);

// const client = new RedisClustr({
//   servers: [
//       {
//           host: 'http://coviduzredis.gjfzq7.0001.aps1.cache.amazonaws.com',
//           port: '6379'
//       }
//   ],
//   createClient: function (port, host) {
//       // this is the default behaviour
//       return RedisClient.createClient(port, host);
//   }
// });

app.use(cors());
app.use(bodyParser.json());
// app.use(
//   ["*.js", "*.html", "*.json", "*.eot", "*.ttf", "*.woff", "*.woff2"],
//   serveCompressed
// );
app.use(express.static(path.join(__dirname, "../client/build")));
// app.set("redis", client);
app.use("/api", require("./routes/api")());
// app.get('/*', );
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// const server = require("http").Server(app);
const port = process.env.PORT || 4000;
// server.listen(port);
app.listen(port, () => {
  console.log(`The app listening at http://localhost:${port}`);
});
// Redis
// client.on("connect", () => {
//   console.log("connected to redis...");
// });
// client.on("error", () => {
//   console.log("connection to redis failed");
// });

const uri = process.env.ATLAS_URI;
// console.log("uri", uri);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database started");
});
