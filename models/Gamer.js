const mongoose = require("mongoose");

const Gamer = new mongoose.Schema({
  wallet_address:{type:String,required:true},
  game_id:{type:mongoose.Schema.Types.ObjectId, ref:"Game"},
  quantity:{type:mongoose.Schema.Types.Mixed},
  nfts:[{type:mongoose.Schema.Types.ObjectId, ref:"Nft"}]
});

/*
gamer object looks like this
{
    wallet_address:"0x....",
    nfts:["nfd id "]
    quantity:{"nft id ":1}
}
*/

module.exports = mongoose.model("Gamer", Gamer);
