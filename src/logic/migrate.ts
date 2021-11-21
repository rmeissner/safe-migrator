import Safe, { EthersAdapter } from "@gnosis.pm/safe-core-sdk"
import { ethers } from 'ethers';
import { serviceSdk, contractNetworks, migrationAddress, migrationInterface } from "./constants"
import { onboard, userProvider } from "./onboard"
import { MetaTransactionData, StatusCallback } from "./types";

const proposeTx = async (safeAddress: string, tx: MetaTransactionData, callback?: StatusCallback): Promise<string> => {
    callback?.("Connecting to wallet")
    if (!await onboard.walletSelect()) throw Error("Wallet selection canceled")
    if (!await onboard.walletCheck()) throw Error("Wallet cannot be used")
    const signer = userProvider?.getSigner()
    if (!signer) throw Error("No Signer connected")
    const senderAddress = await signer.getAddress()
    if (!senderAddress) throw Error("No Wallet connected")
    callback?.("Checking wallet status")
    const safeInfo = await serviceSdk.getSafeInfo(safeAddress)
    if (safeInfo.owners.indexOf(senderAddress) < 0) throw Error("Use is not an owner")
    const ethAdapter = new EthersAdapter({
        ethers,
        signer
    })
    const safe = await Safe.create({ ethAdapter, safeAddress, contractNetworks })
    const safeTransaction = await safe.createTransaction(tx)
    const safeTxHash = await safe.getTransactionHash(safeTransaction)
    callback?.("Please sign the transaction")
    await safe.signTransaction(safeTransaction)
    callback?.("Waiting for service")
    await serviceSdk.proposeTransaction({
        safeAddress,
        senderAddress,
        safeTransaction,
        safeTxHash
    })
    callback?.("Transaction submitted to service")
    return safeTxHash
}

export const migrate = async (safeAddress: string, callback?: StatusCallback): Promise<string> => {
    return await proposeTx(
        safeAddress,
        {
            to: migrationAddress,
            value: "0",
            data: migrationInterface.encodeFunctionData("migrate"),
            operation: 1
        },
        callback
    )
}

export const revertMigration = async (safeAddress: string, callback?: StatusCallback): Promise<string> => {
    return await proposeTx(
        safeAddress,
        {
            to: migrationAddress,
            value: "0",
            data: migrationInterface.encodeFunctionData("revertMigration"),
            operation: 1
        },
        callback
    )
}