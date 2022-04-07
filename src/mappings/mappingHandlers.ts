import {Item} from "../types";
import { FrontierEvmCall } from '@subql/contract-processors/dist/frontierEvm';

import { BigNumber } from "ethers";

// Setup types from ABI
type ListCallArgs = [BigNumber, string] & {nft_id: BigNumber; nft_programe_address: string; };


export async function handleListEvent(event: FrontierEvmCall<ListCallArgs>): Promise<void> {
    const sopoItem = new Item(event.hash);

    sopoItem.owner = event.from;
    sopoItem.contractAddress = event.args.nft_programe_address;
    sopoItem.tokenId = event.args.nft_id.toBigInt();
    sopoItem.onSale = false;
    sopoItem.price = undefined;

    await sopoItem.save();
}