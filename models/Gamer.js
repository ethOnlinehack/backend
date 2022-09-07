const mongoose = require("mongoose");

const Gamer = new mongoose.Schema({
  wallet_address:{type:String,required:true},
  nfts:{type:mongoose.Schema.Types.Mixed}

});

/*
gamer object looks like this
{
    wallet_address:"0x....",
    nfts:{"nft1_id":quantity, "nft2_id":quantity}
}
*/

module.exports = mongoose.model("Gamer", Gamer);
