const Nft = require("../../models/Game");

module.exports = async function (req, res) {
  console.log("Retrieving all nfts by game id ", req.params.gameId);
  
  const nfts = await Nft.find({ gameId: req.params.gameId });

  res.status(200).send(nfts);
};
