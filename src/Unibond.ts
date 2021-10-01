import { BigInt, Address, log } from "@graphprotocol/graph-ts";
import {
  SwapCreated,
  SwapCompleted,
  SwapClosed,
} from "../generated/Unibond/Unibond";
import { SwapList } from "../generated/schema";

export function handleSwapCreated(event: SwapCreated): void {
  let swapId: string = event.params.swapId.toHexString();
  let newSwap = SwapList.load(swapId);
  if (newSwap === null) {
    newSwap = new SwapList(swapId);
    newSwap.swapId = event.params.swapId;
    newSwap.tokenId = event.params.tokenId;
    newSwap.creator = event.params.creator;
    newSwap.payToken = event.params.payToken;
    newSwap.amount = event.params.amount;
    newSwap.assetType = BigInt.fromI32(event.params.assetType);
    newSwap.status = BigInt.fromI32(1);
    newSwap.buyer = Address.fromString(
      "0x000000000000000000000000000000000000dEaD"
    );
    newSwap.save();
  }
}

export function handleSwapCompleted(event: SwapCompleted): void {
  let swapId: string = event.params.swapId.toHexString();
  let myswap = SwapList.load(swapId);
  if (myswap) {
    myswap.status = BigInt.fromI32(2);
    myswap.buyer = event.transaction.from;
    myswap.save();
  }
}

export function handleSwapClosed(event: SwapClosed): void {
  let swapId: string = event.params.swapId.toHexString();
  let myswap = SwapList.load(swapId);
  if (myswap) {
    myswap.status = BigInt.fromI32(0);
    myswap.save();
  }
}
