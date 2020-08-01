const fs = require("fs").promises;
const path = require("path");
const fetch = require("node-fetch");
const wait = require("../utils/wait");
const topojson = require("topojson-server");
const getBoundingBox = require("./getBoundingBox");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const parseZones = async () => {
  let sheetZones = await fs.readFile(
    path.join(__dirname, "../area-layers", "sheets", "Uzb-zones.json"),
    "utf-8"
  );
  sheetZones = JSON.parse(sheetZones);
  const zonesWithoutDisplayName = [],
    displayNameNotFoundInSheet = [];
  for (const sheetZone of sheetZones) {
    const { link } = sheetZone;
    let formatted;
    if (link.indexOf("gist") > -1) {
      const gitId = link.match(/(?:gist.github.com\/.*\/)(.*)/)[1];

      const Gists = require("gists");
      const gists = new Gists({
        username: process.env.GITHUB_USERNAME,
        password: process.env.GITHUB_PASSWORD,
      });

      const res = await gists.get(gitId);
      const gistZones = JSON.parse(res.body.files["map.geojson"].content)
        .features;
      // console.log("gistZones", gistZones);
      for (const gistZone of gistZones) {
        // console.log("gistZone", gistZone);
        // wait(3000);
        if (gistZone.properties && gistZone.properties.displayName) {
          const gistInSheetZone = sheetZones.find((sheetZone, i) => {
            if (sheetZone.zone_name_en && gistZone.properties.displayName) {
              if (
                sheetZone.zone_name_en.trim().toLowerCase() ===
                gistZone.properties.displayName.trim().toLowerCase()
              ) {
                return true;
              }
            }
            return false;
          });
          console.log("gistInSheetZone", gistInSheetZone);
          if (gistInSheetZone) {
            const {
              _id,
              zone_name_en,
              zone_name_cyril,
              zone_name_ru,
              zone_name_uzb,
              place_type,
              parent_id = "",
            } = gistInSheetZone;
            const { geometry } = gistZone;
            const childZones = sheetZones
              .filter((sheetZone) => sheetZone.parent_id === _id)
              .map((sheetZone) => sheetZone._id);
            // console.log('childZones', childZones);
            formatted = {
              type: "Feature",
              properties: {
                displayNameUz: zone_name_uzb,
                displayNameRu: zone_name_ru,
                alias: [
                  zone_name_en,
                  zone_name_cyril,
                  zone_name_ru,
                  zone_name_uzb,
                ],
                refId: _id,
                parentZone: parent_id,
                childZones: childZones,
                placeType: place_type && place_type.toUpperCase(),
                total: {
                  infectedNumber: 111,
                  recoveredNumber: 11,
                  deadNumber: 1,
                },
                status: "SAFE",
              },
              bbox: getBoundingBox(geometry),
              geometry: geometry,
            };
            // console.log("formatted", formatted);
            // const isRegionCountry =
            //   formatted.properties.placeType === "COUNTRY" ||
            //   formatted.properties.placeType === "REGION";
            // if (isRegionCountry) {
            //   formatted = topojson.topology({
            //     collection: {
            //       type: "GeometryCollection",
            //       geometries: [formatted],
            //     },
            //   });
            //   console.log("formatted", formatted);
            //   // wait(5000);
            // }
            try {
              const pathDir = path.join(
                __dirname,
                "../area-layers",
                "formatted"
              );
              await fs.mkdir(pathDir, { recursive: true });
              await fs.writeFile(
                pathDir +
                  "/" +
                  zone_name_en.toLowerCase().replace(/\s/g, "-") +
                  // isRegionCountry
                  // ? ".topojson"
                  // : ".json",
                  ".json",
                JSON.stringify(formatted),
                {
                  encoding: "utf8",
                  flag: "w",
                }
              );
            } catch (err) {
              console.log("err", err);
            }
          } else {
            const pathDir = path.join(__dirname, "../area-layers", "errors");
            await fs.writeFile(
              pathDir + "/sheets" + ".json",
              JSON.stringify(sheetZones),
              {
                encoding: "utf8",
                flag: "w",
              }
            );
            await fs.writeFile(
              pathDir + "/gistZone" + ".json",
              JSON.stringify(gistZone),
              {
                encoding: "utf8",
                flag: "w",
              }
            );
            // console.log('sheetZones', sheetZones);
            // console.log('gistZone', gistZone);
            displayNameNotFoundInSheet.push(gistZone.properties.displayName);
          }
        } else {
          zonesWithoutDisplayName.push(gistZone);
        }
      }
    }
  }
  console.log("displayNameNotFoundInSheet", displayNameNotFoundInSheet);
  console.log("zonesWithoutDisplayName", zonesWithoutDisplayName);
  try {
    const pathDir = path.join(__dirname, "../area-layers", "errors");
    await fs.mkdir(pathDir, { recursive: true });
    await fs.writeFile(
      pathDir + "/zonesWithoutDisplayName" + ".json",
      JSON.stringify(zonesWithoutDisplayName),
      {
        encoding: "utf8",
        flag: "w",
      }
    );
    await fs.writeFile(
      pathDir + "/displayNameNotFoundInSheet" + ".json",
      JSON.stringify(displayNameNotFoundInSheet),
      {
        encoding: "utf8",
        flag: "w",
      }
    );
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = parseZones;
