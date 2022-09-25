const Web3Storage = require("web3.storage").Web3Storage;
const File = require("web3.storage").File;
const newGameItemsJson = require("./NewGameItems.json");
const ethers = require("ethers");
function getAccessToken() {
  return process.env.WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

function makeFileObjects(object, filename) {
  const buffer = Buffer.from(JSON.stringify(object));

  const files = [new File([buffer], filename)];
  return files;
}

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  return cid;
}
const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.infura.io/v3/16e68b2896934870bb1f6c768bfba400"
);
const privateKey = "33e9ba06bdbf3c49faf9799e306ea2ab0015dbd93c53a3d041ae712d91e2bae0";
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract("0x03ECddB0990Ec678642E6D0C1fdbBA990dFEc374", newGameItemsJson.abi, wallet);
const mintToAddress = async (to, id, amount, contractAddress) => {
  const Contract = contract.attach(contractAddress);
  const response = await Contract.mint(to, id, amount, "");
  return response;
};
const transfer = async (from, to, id, amount, contractAddress) => {
  const Contract = contract.attach(contractAddress);
  const response = await Contract.safeTransferFrom(from, to, id, amount, "");
  return response;
};

const setUri = async (tokenId, uri, contractAddress) => {
  const Contract = contract.attach(contractAddress);
  return await Contract.setUri(tokenId, uri);
};

module.exports = {
  storeFiles,
  makeFileObjects,
  makeStorageClient,
  provider,
  wallet,
  contract,
  transfer,
  mintToAddress,
  setUri
};
