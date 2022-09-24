const Nft = require("../../models/Nft");
const utils = require("../utils");
module.exports = async function (req, res) {
  console.log("Creating Nft with body ", req.body);
  const body = req.body;
  // sami uploads ipfs

  const upload = async (name, description, imageURL, cardURL, tokenId, attributes) => {
    const filename = `${tokenId}.json`;
    const metadata = {
      name: name,
      description: description,
      image: imageURL,
      card: cardURL,
      attributes: attributes,
    };
    return await utils.storeFiles(makeFileObjects(metadata, filename));
  };
  const setUri = async (tokenId, uri, contractAddress) => {
    const Contract = utils.contract.attach(contractAddress);
    response = await Contract.setUri(tokenId, uri);
  };

  try {
    const newNft = await Nft.create({
      name: body.nft_name,
      description: body.nft_description,
      ipfs_uri: body.ipfs_uri,
      ipfs_card_uri: body.ipfs_card_uri,
      ipfs_metadata: body.ipfs_metadata,
      game_id: body.game_id,
      attributes: body.attributes,
      token_id: body.token_id,
    });

    console.log("Game Nft  ", newNft);

    res.status(200).send(newNft);
  } catch (err) {
    res.status(500).send("Error creating new game please try again." + err);
  }
};
