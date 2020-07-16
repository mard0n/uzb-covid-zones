const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const zoneSchema = new Schema({
  type: {
    type: "String",
  },
  properties: {
    displayName: {
      type: "String",
    },
    alias: {
      type: ["String"],
    },
    parentZone: {
      type: "String"
    },
    childZones: {
      type: ["ObjectId"], ref: 'Zone'
    },
    placeType: {
      type: "String",
    },
    status: {
      type: "String",
      enum: ["RED", "YELLOW", "GREEN"],
      default: "GREEN",
    },
    total: {
      infectedNumber: "Number",
      recoveredNumber: "Number",
      deadNumber: "Number",
    },
    history: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
          unique: true,
        },
        infectedNumber: "Number",
        recoveredNumber: "Number",
        deadNumber: "Number",
        date: "Date",
      },
    ],
    restrictions: {
      type: "Mixed"
    }
  },
  bbox: {
    type: ["Number"],
  },
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
