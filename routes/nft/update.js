const Nft = require("../../models/Game");

module.exports = async function (req, res) {
  console.log("Updating a nft  with id ", req.params.nftId);
  
  const nft = await Nft.findOneAndUpdate({_id:req.params.nftId},req.body,{returnDocument:"after"});

  res.status(200).send(nft);
};
