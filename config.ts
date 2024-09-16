import { publicKey } from "@metaplex-foundation/umi";

export const MERKLE_MAX_DEPTH = 3;
export const MERKLE_MAX_BUFFER_SIZE = 8;

export const METADATA_COLLECTION_URL =
  "https://api.npoint.io/e5b0d49fdf62681cecbb";
export const METADATA_ITEM_URL = "https://api.npoint.io/96fc193b948718679fa8";
export const IMAGE_URL = "https://ibb.co/55wc17C";

export const COLLECTION_NAME = "Treikto x Solana";
export const COLLECTION_SYMBOL = "TxS";
export const COLLECTION_DESCRIPTION = "cNFT collection from Tejas";
export const FEE_PERCENT = 0;
export const EXTERNAL_URL = "https://tejasanand.tech/";
export const CREATORS = [
  {
    address: publicKey("BsdgGRzDmVTM8FBepRXrQixMZgjP6smsSbuDb1Y7VJB6"),
    verified: false,
    share: 100,
  },
];

export const NFT_ITEM_NAME = "Treikto";
export const NFT_ITEM_IMAGE_URL = IMAGE_URL;
