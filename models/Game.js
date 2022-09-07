const mongoose = require("mongoose");

const Game = new mongoose.Schema({
  name:{type:String,required:true},
  description:String,
  ipfs_uri: { type: String, required: true, unique: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref:"User",required: true },
  created_at:{ type: Date, default: Date.now },
  gamesCreated:[{type:mongoose.Schema.Types.ObjectId, ref:"Game"}],
  smartcontract_address:[{type:String,required:true}],
  access_token:{type:String,required:true}

});



module.exports = mongoose.model("Game", Game);
