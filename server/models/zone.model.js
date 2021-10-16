const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const zoneSchema = new Schema({
  // _id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   default: () => new mongoose.Types.ObjectId(),
  //   unique: true,
  // },
  type: {
    type: "String",
  },
  properties: {
    displayName: {
      type: "String",
    },
    // displayNameUz: {
    //   type: "String",
    // },
    // displayNameRu: {
    //   type: "String",
    // },
    // alias: {
    //   type: ["String"],
    // },
    // refId: {
    //   type: "String",
    // },
    // parentZone: {
    //   type: "String",
    // },
    // childZones: {
    //   type: ["String"],
    // },
    // placeType: {
    //   type: "String",
    //   enum: ["DISTRICT", "CITY", "REGION", "COUNTRY"],
    // },
    // status: {
    //   type: "String",
    //   enum: ["DANGEROUS", "RISKY", "SAFE"],
    //   default: "SAFE",
    // },
    // total: {
    //   infectedNumber: "Number",
    //   recoveredNumber: "Number",
    //   deadNumber: "Number",
    // },
    // history: [
    //   {
    //     _id: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       default: () => new mongoose.Types.ObjectId(),
    //       unique: true,
    //     },
    //     infectedNumber: "Number",
    //     recoveredNumber: "Number",
    //     deadNumber: "Number",
    //     date: "Date",
    //   },
    // ],
    // restrictionsRu: {
    //   type: "Mixed",
    // },
    // restrictionsUz: {
    //   type: "Mixed",
    // },
  },
  // bbox: {
  //   type: ["Number"],
  // },
  geometry: {
    type: {
      type: "String",
    },
    coordinates: {
      type: ["Array"],
    },
  },
});

const Zone = mongoose.model("Zone", zoneSchema, "zones");

module.exports = Zone;
