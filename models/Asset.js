const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  health: {
    type: Number,
    required: true,
  },
});

module.exports = Asset = mongoose.model("asset", AssetSchema);
