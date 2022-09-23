const mongoose = require("mongoose");

const Game = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  smartcontract_address: { type: String, required: true },
  access_token: { type: String, required: true },
});

module.exports = mongoose.model("Game", Game);
