const Nft = require("../../models/Nft");

module.exports = async function (req, res) {
  console.log("Creating Nft with body ", req.body);
  const body = req.body;
  // sami uploads ipfs 

  try {
    const newNft = await Nft.create({
        name:body.name,
        description:body.description,
        ipfs_uri: body.ipfs_uri,
        ipfs_card_uri: body.ipfs_card_uri,
        game_id: body.game_id,
        smartcontract_address:body.smartcontract_address,
        attributes:body.attributes,
    });

    console.log("Game Nft  ", newNft);

    res.status(200).send(newNft);
  } catch (err) {
    res.status(500).send("Error creating new game please try again." + err);
  }
};
