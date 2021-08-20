const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  employer: {
    type: String,
    required: true,
  },
  unit: {
    type: Array,
    required: false,
  },
  asset: {
    type: Array,
    required: false,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
