const Game = require("../../../models/Game");
const Gamer = require("../../../models/Gamer");

module.exports = async function (req, res) {
  console.log("sign-in gamer with body ", req.body);

  const game = await Game.findOne({ access_token: req.params.gameAccessToken });
  if (!game)
    return res.status(404).json({
      code: 404,
      message: "invalid access token",
    });

  const gamer = await Gamer.findOne({
    wallet_address: req.body.wallet_address,
    game_id: game._id,
  }).populate("nfts");

  if (gamer) return res.status(200).json(gamer);

  try {
    const newGamer = await Gamer.create({
      wallet_address: req.body.wallet_address,
      game_id: game._id,
      quantity: {},
      nfts: [],
    });
    console.log("created a gamer  ", newGamer);

    res.status(200).json(newGamer);
  } catch (err) {
    console.log("error while creating a new gamer");
    res.status(500).send("Error creating new game please try again." + err);
  }
};
