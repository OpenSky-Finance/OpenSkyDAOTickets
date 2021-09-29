require('global-agent/bootstrap');
const pinataSDK = require('@pinata/sdk');
const { task } = require('hardhat/config');
const { ticketMetadata } = require("../metadata");

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;
const pinata = pinataSDK(PINATA_API_KEY, PINATA_SECRET_KEY);

task('pinMetaData', 'pin NFT meta data to IPFS')
  .addOptionalParam('series', 'Series Name')
  .addOptionalParam('imageUrl', 'Image URL')
  .addOptionalParam('start', 'Series ID start from')
  .addOptionalParam('count', 'Metadata Count')
  .setAction(async ({ series, imageUrl, start, count }) => {
    start = parseInt(start);
    count = parseInt(count);
    for (let i = start; i < start + count; i++) {
      await pinToIPFS(`${series}_ticket_#${i}_metadata.json`, ticketMetadata(series, i, imageUrl));
    }
  })

async function pinToIPFS(pinataName, jsonMetadata) {
  const pinataOptions = {
    pinataMetadata: {
      name: pinataName,
    },
  };

  const resp = await pinata
    .pinJSONToIPFS(jsonMetadata, pinataOptions)
    .catch((err) => {
      throw new Error(`Error pinning #${pinataName}, stopping.`);
    });
  return `ipfs://${resp.IpfsHash}`;
}
