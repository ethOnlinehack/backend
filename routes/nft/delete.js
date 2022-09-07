const Nft = require("../../models/Game");

module.exports = async function (req, res) {
  console.log("deleting  a nft with id ", req.params.nftId);
  
  const nft = await Nft.deleteOne({_id:req.params.nftId});

  res.status(200).send(nft);
};
