import { ethers } from 'ethers';
import SafeServiceClient from '@gnosis.pm/safe-service-client';

export const contractNetworks = {
    // bsc
    56: {
        multiSendAddress: '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
        safeMasterCopyAddress: '0x3E5c63644E683549055b9Be8653de26E0B4CD36E',
        safeProxyFactoryAddress: '0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2'
    },
}
export const bscFixSingleton = "0x4e6A0E034318Bec795c5E1dD4817A424767265A7"
export const migrationAddress = "0x82b71f39d719cC971B80E7A7B6c0c2aF96a5abC1"
export const migrationInterface = new ethers.utils.Interface([
    "function migrate() public",
    "function revertMigration() public"
])
export const rpcUrl = "https://bsc-dataseed.binance.org/"
export const serviceUrl = "https://safe-transaction.bsc.gnosis.io/"
export const serviceSdk = new SafeServiceClient(serviceUrl)

export const buildSafeTxLink = (safeAddress: string, safeTxHash: string): string => {
    return `https://gnosis-safe.io/app/bnb:${safeAddress}/transactions/${safeTxHash}`
}