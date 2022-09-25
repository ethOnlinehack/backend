const Nft = require("../../models/Nft");

module.exports = async function (req, res) {
  console.log("Retrieving all nfts by game id ", req.params.gameId);
  const nfts = await Nft.find({ game_id: req.params.gameId });
  res.status(200).send(nfts);
};
