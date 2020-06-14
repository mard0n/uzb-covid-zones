const jwt = require("jsonwebtoken");

// const wait = require("../utils/wait");
const verifyToken = require("../utils/auth");
const router = require("express").Router();

const Zone = require("../models/zone.model");
const ZoneCategories = require("../models/zoneCategory.model");
const Admin = require("../models/admin.model");

const jwtExpiry = '1h';

router.post("/authenticate", async (req, res, next) => {
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
// router.get("/is-authenticated", verifyToken, async (req, res) => {
//   console.log("isAuthenticated");
//   jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
//     if (err) {
//       res.send(false);
//     } else {
//       res.send(true);
//     }
//   });
// });

router.get("/zones", async (req, res) => {
  Zone.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Admin error catch", err);
      res.sendStatus(500);
    });
});

router.get("/zones-status", async (req, res) => {
  ZoneCategories.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Admin error catch", err);
      res.sendStatus(500);
    });
});

module.exports = router;
