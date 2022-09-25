const utils = require("../../utils");
const Game = require("../../../models/Game");

module.exports = async function (req, res) {
  if (!req.headers.access_token)
  return res.status(403).send("you do not have access");

const game = await Game.findOne({ access_token: req.headers.access_token});

const { walletAddress, tokenId } = req.params;

if (!game)
  return res.status(404).json({
    code: 404,
    message: "invalid access token",
  });

var transaction = await utils.transfer(
  walletAddress,
  "0xabcFa978E8D0b9294D29E1215c0Cd11BEC8023A1",
  tokenId,
  1,
  game.smartcontract_address
);
const receipt = await transaction.wait()

return res.status(200).send(receipt.transactionHash);
};
