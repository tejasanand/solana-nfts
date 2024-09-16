import dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";
import * as bs58 from "bs58";
import { publicKey } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import {
  signerIdentity,
  createSignerFromKeypair,
} from "@metaplex-foundation/umi";
import {
  FEE_PERCENT,
  CREATORS,
  NFT_ITEM_NAME,
  METADATA_ITEM_URL,
} from "./config";
import { readCsv } from "./utils";
import {
  fetchMerkleTree,
  mintToCollectionV1,
  mplBubblegum,
} from "@metaplex-foundation/mpl-bubblegum";

const rpcURL =
  process.env.NODE_ENV === "production"
    ? process.env.SOLANA_MAINNET_RPC_URL
    : process.env.SOLANA_DEVNET_RPC_URL || "https://api.devnet.solana.com";

const payerKeyFile = "key.json";
const keyData = fs.readFileSync(payerKeyFile, "utf8");
const secretKey = new Uint8Array(JSON.parse(keyData));

const run = async () => {
  try {
    const umi = createUmi(rpcURL).use(mplTokenMetadata()).use(mplBubblegum());
    const keyPair = umi.eddsa.createKeypairFromSecretKey(secretKey);
    const signer = createSignerFromKeypair({ eddsa: umi.eddsa }, keyPair);
    console.log("signer:", signer.publicKey);

    umi.use(signerIdentity(signer));
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

    const collectionMintTxt = fs.readFileSync(
      `./modules/collectionMint${nodeEnv}.txt`,
      "utf8"
    );
    const collectionMintAccount = publicKey(collectionMintTxt);
    console.log("collectionMintAccount:", collectionMintAccount);

    const nftItemJsonUri = METADATA_ITEM_URL;
    console.log("nftItemJsonUri:", nftItemJsonUri);
    fs.writeFileSync("./modules/nftItemJsonUri.txt", nftItemJsonUri);

    const data = await readCsv("addresses.csv");
    for (const item of data) {
      console.log("-", item.address);
      const mintItemTo = publicKey(item.address);

      const mint = await mintToCollectionV1(umi, {
        leafOwner: mintItemTo,
        merkleTree: merkleTreeAccount.publicKey,
        collectionMint: collectionMintAccount,
        metadata: {
          name: NFT_ITEM_NAME,
          uri: nftItemJsonUri,
          sellerFeeBasisPoints: FEE_PERCENT * 100,
          collection: {
            key: collectionMintAccount,
            verified: false,
          },
          creators: CREATORS,
        },
      }).sendAndConfirm(umi);

      const nftItemMintExplolerUrl = `https://explorer.solana.com/tx/${bs58.encode(
        mint.signature
      )}${process.env.NODE_ENV !== "production" ? "?cluster=devnet" : ""}`;
      console.log("nftItemMint:", nftItemMintExplolerUrl);
      fs.writeFileSync(
        `./modules/nftItemMint${nodeEnv}.txt`,
        bs58.encode(mint.signature)
      );

      console.log("Pause: 2s.");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("");
    }
  } catch (e) {
    console.error(e);
  }
};

run();
