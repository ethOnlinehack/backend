const Game = require("../../../models/Game");
const utils = require("../../utils");
module.exports = async function (req, res) {
  if (!req.headers.access_token)
    return res.status(403).send("you do not have access");

  const game = await Game.findOne({ access_token: req.headers.access_token });

  const { walletAddress, tokenId } = req.params;

  if (!game)
    return res.status(404).json({
      code: 404,
      message: "invalid access token",
    });
try{
  var transaction = await utils.mintToAddress(
    walletAddress,
    tokenId,
    1,
    game.smartcontract_address
  );
  const receipt = await transaction.wait()

  return res.status(200).send(receipt.transactionHash);
}catch(err){
console.log(err)
res.status(500).send("error")
}

};
