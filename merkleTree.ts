import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplBubblegum } from "@metaplex-foundation/mpl-bubblegum";
import { publicKey } from "@metaplex-foundation/umi";
import * as fs from "fs";

const rpcURL =
  process.env.NODE_ENV === "production"
    ? process.env.SOLANA_MAINNET_RPC_URL
    : process.env.SOLANA_DEVNET_RPC_URL || "https://api.devnet.solana.com";

const run = async () => {
  try {
    const umi = createUmi(rpcURL).use(mplBubblegum());
    const nodeEnv =
      process.env.NODE_ENV === "production" ? "Mainnet" : "Devnet";

    const merkleTreeTxt = fs.readFileSync(
      `./modules/merkleTree${nodeEnv}.txt`,
      "utf8"
    );
    const merkleTreeAccount = await fetchMerkleTree(
      umi,
      publicKey(merkleTreeTxt)
    );
    console.log("merkleTreeAccount:", merkleTreeAccount.publicKey);

    // Additional logic for merkle tree can be added here
  } catch (e) {
    console.error(e);
  }
};

run();
