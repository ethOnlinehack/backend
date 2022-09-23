module.exports = async function (req, res) {
  console.log("Retrieving Game's API reference Object");

  const ApiReference = {
    post: [
      {
        url: "/api/v1/gamer-sign-in",
        description: "login or register the gamer",
        input: [
          {
            name: "wallet_address",
            type: "string",
            description: "Gamer's wallet address",
          },
        ],
        response: {
          200: {
            message: `
            {
                wallet_address: string ,
                game_id: string,
                quantity: {"nftID": int},
                nfts: ["nftObject"]
            }`,
            type: "json",
          },
        },
      },
    ],
    get: [
      {
        url: "/api/v1/verify/:walletAddress/:nftId",
        description: "Verify the quanity of a specific Nft a gamer owns",
        parameters: [
          {
            name: "walletAddress",
            type: "string",
            description: "the wallet of the gamer",
          },
          {
            name: "nftId",
            type: "string",
            description: "Id of the NFT in the database",
          },
        ],
        response: {
          200: {
            message: "nftQuantity",
            type: "string",
          },
        },
      },
      {
        url: "/api/v1/get-all-nfts",
        description: "Retrieve all Nfts of the game",
        response: {
          200: {
            message: `[
                {nftObject}
            ]` ,
            type: "json",
          },
        },
      },
      {
        url: "/api/v1/get-all-nfts/:walletAddress",
        description: "Retrieve a gamer's Nfts",
        parameters: [
          {
            name: "walletAddress",
            type: "string",
            description: "the wallet of the gamer",
          }
        ],
        response: {
          200: {
            message: `{
                wallet_address:string,
                game_id:string,
                quantity:{"nftID":quantity},
                nfts:[{NftObject}]
              }`,
            type: "Json",
          },
        },
      },
    ],
  };

  res.status(200).send(ApiReference);
};
