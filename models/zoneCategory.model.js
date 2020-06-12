const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const zoneCategorySchema = new Schema({
  id: {
    type: "String",
  },
  range: {
    type: ["String"],
  },
  color: {
    type: "String",
  },
  restrictions: {
    type: ["String"],
  },
});

const ZoneCategory = mongoose.model(
  "ZoneCategory",
  zoneCategorySchema,
  "zoneCategories"
);

module.exports = ZoneCategory;
