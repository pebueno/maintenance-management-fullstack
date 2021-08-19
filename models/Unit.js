const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

module.exports = Unit = mongoose.model("unit", UnitSchema);
