const Game = require("../../../models/Game");
const Gamer = require("../../../models/Gamer");

module.exports = async function (req, res) {
  console.log("verify quantity of nft for gamer ");
  if(!req.headers.access_token)
    return res.status(403).send("you do not have access")
  const game = await Game.findOne({ access_token: req.headers.access_token });
  if (!game)
    return res.status(404).json({
      code: 404,
      message: "invalid access token",
    });

  const gamer = await Gamer.findOne({
    wallet_address: req.params.walletAddress,
    game_id: game._id,
  }).populate("nfts");

  if (!gamer) return res.status(500).send("Gamer not found.");

  return res.status(200).json(gamer.nfts);
};
