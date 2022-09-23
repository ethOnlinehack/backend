const File = require("web3.storage").File;
const Web3Storage = require("web3.storage").Web3Storage;

function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}

module.exports = async function (req, res) {
  if (!req.files) return res.status(404).send("error uploading file");
  const fileData = req.files.file;
  const files = [new File([req.files.file.data], fileData.name)];
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  const url = `https://${cid}.ipfs.w3s.link/${fileData.name}`;
  res.status(200).json(url);
};
