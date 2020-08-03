const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const RedisClustr = require('redis-clustr');
const redis = require("redis");
const path = require("path");
require("dotenv").config();

const app = express();
const client = ""
const client = redis.createClient(process.env.REDIS_URL || 6379);
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
app.use(express.static(path.join(__dirname, "../client/deploy")));
app.set("redis", client);
app.use("/api", require("./routes/api")(client));
// app.get('/*', );
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "client/deploy", "index.html"));
});

const server = require("http").Server(app);
server.listen(4000);

// Redis
client.on("connect", () => {
  console.log("connected to redis...");
});

// Socket
const io = require("socket.io")(server);
io.use(function (socket, next) {
  console.log("socket.handshake.query.token", socket.handshake.query.token);
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token,
      process.env.JWT_SECRET_KEY,
      function (err, decoded) {
        console.log("jwt error", err);

        if (err) return next(new Error("Authentication error"));
        socket.decoded = decoded;
        next();
      }
    );
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", (socket) => {
  console.log("socket connected");
  require("./routes/socket")(socket, client);
});

const uri = process.env.ATLAS_URI;
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
