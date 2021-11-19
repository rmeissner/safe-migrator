import Onboard from 'bnc-onboard'
import { ethers } from 'ethers'
import { Button } from '@mui/material';
import SafeServiceClient from '@gnosis.pm/safe-service-client';
import Safe, { EthersAdapter } from '@gnosis.pm/safe-core-sdk';

const contractNetworks = {
  // bsc
  56: {
    multiSendAddress: '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
    safeMasterCopyAddress: '0x3E5c63644E683549055b9Be8653de26E0B4CD36E',
    safeProxyFactoryAddress: '0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2'
  },
}
const migrationAddress = "0x82b71f39d719cC971B80E7A7B6c0c2aF96a5abC1"
const migrationInterface = new ethers.utils.Interface([
  "function migrate() public",
  "function revertMigration() public"
])
const rpcUrl = "https://bsc-dataseed.binance.org/"
const serviceUrl = "https://safe-transaction.bsc.gnosis.io/"
const safeAddress = "0x11c49ed9bd5Df313037c23B4801e5D6993ED9c72"
const serviceSdk = new SafeServiceClient(serviceUrl)
let userProvider: ethers.providers.Web3Provider | undefined
const onboard = Onboard({
  networkId: 56,
  subscriptions: {
    wallet: wallet => {
      if(wallet.provider)
        userProvider = new ethers.providers.Web3Provider(wallet.provider)
      else 
        userProvider = undefined
    }
  }
});

const migrate = async (): Promise<void> => {
  await onboard.walletSelect()
  await onboard.walletCheck()
  const signer = userProvider?.getSigner()
  if (!signer) throw Error("No Signer connected")
  const senderAddress = await signer.getAddress()
  console.log({ senderAddress })
  if (!senderAddress) throw Error("No Wallet connected")
  const safeInfo = await serviceSdk.getSafeInfo(safeAddress)
  console.log({ safeInfo })
  if (safeInfo.owners.indexOf(senderAddress) < 0) throw Error("Use is not an owner")
  const ethAdapter = new EthersAdapter({
    ethers,
    signer
  })
  const safe = await Safe.create({ ethAdapter, safeAddress, contractNetworks })
  const safeTransaction = await safe.createTransaction({
    to: migrationAddress,
    value: "0",
    data: migrationInterface.encodeFunctionData("migrate"),
    operation: 1
  })
  const safeTxHash = await safe.getTransactionHash(safeTransaction)
  await safe.signTransaction(safeTransaction)
  console.log("Signed tx")
  console.log(safeTransaction)
  await serviceSdk.proposeTransaction({
    safeAddress,
    senderAddress,
    safeTransaction,
    safeTxHash
  })
  console.log("Proposed tx")
}

function App() {

  const handleMigrationButton = async () => {
    try {
      await migrate()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Button onClick={() => handleMigrationButton()}>Migrate</Button>
    </div>
  );
}

export default App;
