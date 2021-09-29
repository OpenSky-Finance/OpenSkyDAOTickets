require('global-agent/bootstrap');
const pinataSDK = require("@pinata/sdk");
const { task } = require('hardhat/config');
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;
const pinata = pinataSDK(PINATA_API_KEY, PINATA_SECRET_KEY);

task('unpinMetaData', 'Unpin NFT metadata json')
  .setAction(async ({ }) => {
    let page = 0, hasMore = true, pageSize = 100;
    while (hasMore) {
      let { rows } = await pinata.pinList({
        pageLimit: pageSize,
        pageOffset: page++ * pageSize
      });

      for (let i = 0; i < rows.length; i++) {
        await pinata.unpin(rows[i].ipfs_pin_hash).catch(error => {
          console.error(error);
        });
      }

      hasMore = rows.length > 0;
    }
  })