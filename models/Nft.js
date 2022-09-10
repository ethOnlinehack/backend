const mongoose = require("mongoose");

const Nft = new mongoose.Schema({
  name:{type:String,required:true},
  description:{type:String,required:true},
  ipfs_uri: { type: String, required: true, unique: true },
  ipfs_card_uri: { type: String, required: true, unique: true },
  game_id:{type:mongoose.Schema.Types.ObjectId, ref:"Game",required:true} ,
  smartcontract_address:{type:String, ref:"Game"},
  attributes:{type:mongoose.Schema.Types.Mixed},
  created_at:{ type: Date, default: Date.now },


});



module.exports = mongoose.model("Nft", Nft);
