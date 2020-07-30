const router = require("express").Router();
const jwt = require("jsonwebtoken");
const JSONStream = require("JSONStream");
// const wait = require("../utils/wait");
const getZones = require("../utils/get-zones-from-sheets");

const Zone = require("../models/zone.model");
const Admin = require("../models/admin.model");

module.exports = (redis) => {
  const checkCache = require("../utils/checkCache")(redis);

  router.post("/authenticate", async (req, res, next) => {
    const jwtExpiry = "1h";
    console.log("api authenticate has been called");

    Admin.find({})
      .then((data) => {
        console.log("data", data);
        for (let i = 0; i < data.length; i++) {
          const { username, password } = data[i];
          if (req.body.username == username && req.body.password === password) {
            const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
              algorithm: "HS256",
              expiresIn: jwtExpiry,
            });
            res.send(token);
            next();
          }
        }
        res.send(false);
      })
      .catch((err) => {
        console.log("Admin error catch", err);
        res.sendStatus(500);
      });
  });

  router.get("/zones", checkCache, async (req, res) => {
    // console.time("zones");
    console.log("Zones have been called");
    const query = Zone.find({}, null, { lean: true });
    query.exec((err, zones) => {
      if (err) throw err;
      console.log("zones", zones);
      redis.set("zones", JSON.stringify(zones));
    });
    query
      .cursor()
      .on("data", function (data) {
        // console.log("Chunk!");
      })
      .pipe(JSONStream.stringify())
      .pipe(res);
    // .then((data) => {
    //   console.log("Zones found");
    //   res.send(data);
    //   console.timeEnd("zones");
    // })
    // .catch((err) => {
    //   console.timeEnd("zones");
    //   console.log("Admin error catch", err);
    //   res.sendStatus(500);
    // });
  });

  router.get("/parse-files", async (req, res) => {
    console.log("parse called");

    const status = await getZones();
    console.log("status", status);
    res.send("success");
  });
  
  return router;
};
