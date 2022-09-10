const Nft = require("../../models/Nft");

module.exports = async function (req, res) {
  console.log("Retrieving a Nft with nft id ", req.params.nftId);
  
  const nft = await Nft.findById(req.params.nftId);

  res.status(200).send(nft);
};
