import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

//Importing and configuring our .env file that we use to securely store our environment variables
import dotenv from "dotenv";
dotenv.config();

const app = sdk.getAppModule("0x0DAF0fcda387A4026283152853B289a5975A6A91");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      // The collection's name, ex. CryptoPunks
      name: "MateDAO Membership",
      // A description for the collection.
      description: "A DAO for mate drinkers (ú,🚀)",
      // The image for the collection that will show up on OpenSea.
      image: readFileSync("scripts/assets/mate.png"),
      // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
      // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
      // you can set this to your own wallet address if you want to charge for the drop.
    //   primarySaleRecipientAddress: ethers.constants.AddressZero,
      primarySaleRecipientAddress: process.env.WALLET_ADDRESS,
    });
    
    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})()