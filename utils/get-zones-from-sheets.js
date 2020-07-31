const fs = require("fs").promises;
const path = require("path");
const fetch = require("node-fetch");
const wait = require("../utils/wait");
const getBoundingBox = require("./getBoundingBox");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getZones = async () => {
  const content = await fs.readFile(
    path.join(__dirname, "../area-layers", "sheets", "Uzb-zones.json"),
    {encoding: "utf-8"}
  );
  console.log("content", content);
  const test = [
    // {
    //   No: "1",
    //   Zone: "Андижон вилояти",
    //   "Zone (eng)": "Andijan region",
    //   "Place type": "Region",
    //   "Parent zone": "Узбекистан",
    //   "GeoJSON (main link)":
    //     "https://nominatim.openstreetmap.org/reverse?format=json&osm_id=178016&osm_type=R&polygon_geojson=1",
    //   "OSM (secondary link)": "",
    //   OSMID: "178016",
    //   "Place ID": "",
    // },
    {
      No: "2",
      Zone: "Андижон тумани",
      "Zone (eng)": "Andijan district",
      "Place type": "District",
      "Parent zone": "Андижон вилояти",
      "GeoJSON (main link)":
        "https://gist.github.com/Thefamir/0e7d804a35ce3b065ccde2f22c92df7d",
      "OSM (secondary link)": "",
      OSMID: "",
      "Place ID": "",
    },
    // {
    //   No: "3",
    //   Zone: "Андижон шаҳри",
    //   "Zone (eng)": "Andijan city",
    //   "Place type": "City",
    //   "Parent zone": "Андижон вилояти",
    //   "GeoJSON (main link)":
    //     "https://nominatim.openstreetmap.org/details.php?osmtype=W&osmid=331189322&polygon_geojson=1&format=json",
    //   "OSM (secondary link)": "",
    //   OSMID: "331189322",
    //   "Place ID": "",
    // },
  ];
  // JSON.parse(content)
  for (const zoneObj of JSON.parse(content)) {
    console.log("zoneObj", zoneObj);
    const {
      Zone: zoneNameRu,
      "Zone (eng)": zoneName,
      "Place type": placeType,
      "Parent zone (eng)": parentZone,
      "GeoJSON (main link)": link,
    } = zoneObj;
    let formatted;
    if (link.indexOf("reverse") > -1) {
      wait(2000);
      const res = await fetch(link, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
        },
      });
      const body = await res.json();
      console.log("reverse res", body);
      const { geojson } = body;
      formatted = {
        type: "Feature",
        properties: {
          alias: [zoneName, zoneNameRu],
          displayName: zoneName,
          placeType: placeType && placeType.toUpperCase(),
          total: {
            infectedNumber: 111,
            recoveredNumber: 11,
            deadNumber: 1,
          },
          status: "GREEN",
        },
        bbox: getBoundingBox(geojson),
        geometry: geojson,
      };
      console.log("formatted", formatted);
    } else if (link.indexOf("details.php") > -1) {
      wait(2000);
      const res = await fetch(link, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
        },
      });
      const body = await res.json();
      console.log("details.php res", body);
      const { names, geometry } = body;
      formatted = {
        type: "Feature",
        properties: {
          alias: names && Object.values(names),
          displayName: zoneName,
          placeType: placeType && placeType.toUpperCase(),
          total: {
            infectedNumber: 111,
            recoveredNumber: 11,
            deadNumber: 1,
          },
          status: "GREEN",
        },
        bbox: getBoundingBox(geometry),
        geometry: geometry,
      };
      console.log("formatted", formatted);
    } else if (link.indexOf("gist") > -1) {
      const gitId = link.match(/(?:gist.github.com\/.*\/)(.*)/)[1];
      console.log("gist", zoneName, gitId);

      const Gists = require("gists");
      const gists = new Gists({
        username: process.env.GITHUB_USERNAME,
        password: process.env.GITHUB_PASSWORD,
      });

      const res = await gists.get(gitId);
      const zone = JSON.parse(res.body.files["map.geojson"].content)
        .features[0];
      console.log("zone", zone);
      const { geometry } = zone;

      formatted = {
        type: "Feature",
        properties: {
          alias: [zoneName, zoneNameRu],
          displayName: zoneName,
          placeType: placeType && placeType.toUpperCase(),
          total: {
            infectedNumber: 111,
            recoveredNumber: 11,
            deadNumber: 1,
          },
          status: "GREEN",
        },
        bbox: getBoundingBox(geometry),
        geometry: geometry,
      };
      console.log("formatted", formatted);
    }
    try {
      const folderCategory = parentZone
        ? parentZone.toLowerCase().replace(" ", "-")
        : "parent-less";

      const pathDir = path.join(
        __dirname,
        "../area-layers",
        "formatted",
        folderCategory
      );
      await fs.mkdir(pathDir, { recursive: true });
      const writeRes = await fs.writeFile(
        pathDir + "/" + zoneName.toLowerCase().replace(" ", "-") + ".json",
        JSON.stringify(formatted),
        {
          encoding: "utf8",
          flag: "w",
        }
      );
      // console.log("writeRes", writeRes);
    } catch (err) {
      console.log(err);
    }
  }
  // return
};

module.exports = getZones;
