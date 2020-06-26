const fs = require("fs");
const path = require("path");
const getBoundingBox = require("./getBoundingBox");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const format = (cb) => {
  const dirname = path.join(__dirname, "../area-layers", "toFormat");
  console.log("dirname", dirname);
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      console.warn(err);
      return;
    }
    console.log(filenames);

    filenames.forEach(function (filename) {
      console.log('dirname + "/" + filename', dirname + "/" + filename);
      fs.readFile(dirname + "/" + filename, "utf-8", function (err, content) {
        if (err) {
          console.warn(err);
          return;
        }
        console.log("content", JSON.parse(content));
        let formatted;
        if (filename.indexOf("reverse") > -1) {
          const { display_name, boundingbox, geojson } = JSON.parse(content);
          formatted = {
            type: "Feature",
            properties: {
              alias: [],
              displayName: display_name,
              placeType: "",
              total: {
                infectedNumber: 111,
                recoveredNumber: 11,
                deadNumber: 1,
              },
              status: "GREEN",
            },

            bbox: boundingbox,
            geometry: geojson,
          };
        } else if (filename.indexOf("osmid") > -1) {
          const { names, localname, geometry, type } = JSON.parse(content);
          formatted = {
            type: "Feature",
            properties: {
              alias: names && Object.values(names),
              displayName: localname,
              placeType: type && type.toUpperCase(),
              total: {
                infectedNumber: 111,
                recoveredNumber: 11,
                deadNumber: 1,
              },
              status: "GREEN",
            },

            bbox: getBoundingBox(JSON.parse(content).geometry),
            geometry: geometry,
          };
        } else if (filename.indexOf("gist") > -1) {
          const { geometry } = JSON.parse(content);
          console.log("JSON.parse(content)", JSON.parse(content));
          console.log("properties", JSON.parse(content).properties);
          const formatedFileName = filename
            .match(/(.*)(?:.gist.json)/)[1]
            .replace("-", " ");
          formatted = {
            type: "Feature",
            properties: {
              alias: [],
              displayName: capitalizeFirstLetter(formatedFileName),
              placeType: "",
              total: {
                infectedNumber: 111,
                recoveredNumber: 11,
                deadNumber: 1,
              },
              status: "GREEN",
            },

            bbox: getBoundingBox(JSON.parse(content).geometry),
            geometry: geometry,
          };
        }
        console.log("formatted", formatted);

        fs.writeFile(
          path.join(__dirname, "../area-layers", "formatted", filename),
          JSON.stringify(formatted),
          "utf8",
          function (err) {
            if (err) {
              return console.log(err);
            }
            cb("success");
            console.log("The file was saved!");
          }
        );
      });
    });
  });
};

module.exports = format;
