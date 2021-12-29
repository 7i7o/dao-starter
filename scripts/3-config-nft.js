import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x91c93e9999b39F9F1F483E4A5bD94591e2c25Da0",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Mate",
        description: "This NFT will give you access to MateDAO!",
        image: readFileSync("scripts/assets/matecito.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()