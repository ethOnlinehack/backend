const utils = require("../../utils");
const Game = require("../../../models/Game");
const Gamer = require("../../../models/Gamer");
const Nft = require("../../../models/Nft");
module.exports = async function (req, res) {
  if (!req.headers.access_token) return res.status(403).send("you do not have access");
  const game = await Game.findOne({ access_token: req.headers.access_token });
  if (!game)
    return res.status(404).json({
      code: 404,
      message: "invalid access token",
    });
};
