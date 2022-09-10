const Game = require("../../../models/Game");
const Nft = require("../../../models/Nft");

module.exports = async function (req, res) {
  console.log("verify quantity of nft for gamer ");

  const game = await Game.findOne({ access_token: req.params.gameAccessToken });
  if (!game)
    return res.status(404).json({
      code: 404,
      message: "invalid access token",
    });

  const nfts = await Nft.find({game_id:game._id});

  if (!nfts) return res.status(500).send("nfts not found.");

  return res.status(200).json(nfts);
};
