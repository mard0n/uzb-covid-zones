const router = require("express").Router();
const jwt = require("jsonwebtoken");
const JSONStream = require("JSONStream");

const Zone = require("../models/zone.model");

module.exports = () => {
  // const checkCache = require("../utils/checkCache")(redis);

  router.get("/zones", async (req, res) => {
    // console.time("zones");
    console.log("Zones have been called");
    const query = Zone.find({}, null, { lean: true });
    query.exec((err, zones) => {
      if (err) throw err;
      console.log("zones", zones);
      // redis.set("zones", JSON.stringify(zones));
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

  // router.get("/parse-files", async (req, res) => {
  //   console.log("parse called");

  //   const status = await parseZones();
  //   console.log("status", status);
  //   res.send("success");
  // });

  // router.get("/save-files", async (req, res) => {
  //   const folderPath = path.join(__dirname, "../area-layers", "formatted");
  //   console.log("folderPath", folderPath);
  //   const filenames = await fs.readdir(folderPath);
  //   const zones = []

  //   // const failedToSave = [],
  //   //   successToSave = [];

  //   for (const filename of filenames) {
  //     console.log("filename", filename);
  //     if (!filename.startsWith(".")) {
  //       let sheetZone = await fs.readFile(path.join(folderPath, filename), {
  //         encoding: "utf-8",
  //       });
  //       sheetZone = JSON.parse(sheetZone);
  //       zones.push(sheetZone)
  //       // const obj = {
  //       //   ...sheetZone,
  //       //   history:
  //       // }
  //       // const zone = new Zone(sheetZone, {upsert: true});
  //       // // wait(5000)
  //       // zone.save(function (err, results) {
  //       //   if (err) {
  //       //     failedToSave.push(sheetZone.properties.displayNameUz);
  //       //     console.log("err", err);
  //       //   } else {
  //       //     successToSave.push(sheetZone.properties.displayNameUz);
  //       //     console.log("saved", results);
  //       //   }
  //       // });
  //     }
  //   }
    
  //   Zone.insertMany(zones, (err, doc) => {
  //     if(err){
  //       console.log('err', err);
  //     }
  //   })
  //   // console.log("successToSave", successToSave);
  //   // console.log('failedToSave', failedToSave);
  //   res.send("success");
  // });

  return router;
};
