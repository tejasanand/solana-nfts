import { publicKey } from '@metaplex-foundation/umi'

export const MERKLE_MAX_DEPTH       = 14;
export const MERKLE_MAX_BUFFER_SIZE = 64;

export const METADATA_COLLECTION_URL = "https://laugharne.github.io/cnft_metadata.json";
export const METADATA_ITEM_URL       = "https://laugharne.github.io/cnft_item_metadata.json";
export const IMAGE_URL               = "https://laugharne.github.io/logo.png";

export const COLLECTION_NAME        = 'Solana Summer Fellowship 2024'
export const COLLECTION_SYMBOL      = 'SSF24'
export const COLLECTION_DESCRIPTION = 'Solana Summer Fellowship 2024 cNFT collection from Laugharne'
export const FEE_PERCENT            = 0
export const EXTERNAL_URL           = 'https://laugharne.github.io'
export const CREATORS               = [
  {
    address: publicKey('9BbWp6tcX9MEGSUEpNXfspYxYsWCxE9FgRkAc3RpftkT'),
    verified: false,
    share: 100,
  },
]

export const NFT_ITEM_NAME      = 'Laugharne Limited Edition'
export const NFT_ITEM_IMAGE_URL = IMAGE_URL;


