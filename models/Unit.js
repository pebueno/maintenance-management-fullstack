const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  asset: {
    type: String,
    required: false,
  },
});

module.exports = Unit = mongoose.model("unit", UnitSchema);
