import { Order } from '../types'
import { FrontierEvmCall, FrontierEvmEvent } from '@subql/contract-processors/dist/frontierEvm'

import { BigNumber } from 'ethers'

// Setup types from ABI
type ListedEventArgs = [string, string, BigNumber, BigNumber, string] & {
  from: string
  to: string
  sopo_id: BigNumber
  nft_id: BigNumber
  nft_programe_address: string
}
type ListCallArgs = [BigNumber, string] & { nft_id: BigNumber; nft_programe_address: string }

export async function handleListedEvent(event: FrontierEvmEvent<ListedEventArgs>): Promise<void> {
  const sopoItem = new Order(event.transactionHash)

  sopoItem.owner = event.args.from
  sopoItem.contractAddress = event.args.nft_programe_address
  sopoItem.tokenId = event.args.nft_id.toBigInt()
  sopoItem.sopoId = event.args.sopo_id.toBigInt()
  sopoItem.onSale = false
  sopoItem.price = undefined

  await sopoItem.save()
}

export async function handleList(event: FrontierEvmCall<ListCallArgs>): Promise<void> {
  const sopoItem = new Order(event.hash)

  sopoItem.owner = event.from
  sopoItem.contractAddress = event.args.nft_programe_address
  sopoItem.tokenId = event.args.nft_id.toBigInt()

  await sopoItem.save()
}
