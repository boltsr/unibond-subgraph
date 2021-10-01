import { BigInt } from "@graphprotocol/graph-ts";

import { Transfer } from "../generated/Univ3NFT/Univ3NFT";
import { TokenHolder } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
  let tId: string = event.params.tokenId.toString();
  let tData = TokenHolder.load(tId);
  if (tData == null) {
    tData = new TokenHolder(tId);
    tData.holderAddress = event.params.to;
    tData.tokenId = event.params.tokenId;
    tData.save();
  } else {
    tData.holderAddress = event.params.to;
    tData.save();
  }
}
