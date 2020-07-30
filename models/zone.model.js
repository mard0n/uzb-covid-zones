const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const zoneSchema = new Schema({
  _id: Schema.Types.ObjectId,
  type: String,
  properties: {
    displayNameUz: String,
    displayNameRu: String,
    alias: [String],
    parentZone: { type: Schema.Types.ObjectId, ref: "Zone" },
    childZones: [{ type: Schema.Types.ObjectId, ref: "Zone" }],
    placeType: {
      type: String,
      enum: ["DISTRICT", "CITY", "REGION", "COUNTRY"],
    },
    status: {
      type: String,
      enum: ["DANGEROUS", "RISKY", "SAFE"],
      default: "SAFE",
    },
    total: {
      infectedNumber: Number,
      recoveredNumber: Number,
      deadNumber: Number,
    },
    history: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
          unique: true,
        },
        infectedNumber: Number,
        recoveredNumber: Number,
        deadNumber: Number,
        date: Date,
      },
    ],
    restrictionsRu: {
      type: "Mixed",
    },
    restrictionsUz: {
      type: "Mixed",
    },
  },
  bbox: [Number],
  geometry: {
    type: String,
    coordinates: [Array],
  },
});

const Zone = mongoose.model("Zone", zoneSchema, "zones");

module.exports = Zone;
