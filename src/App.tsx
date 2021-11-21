import { Button, CircularProgress, Container, Link, TextField, Typography } from '@mui/material';
import './App.css';
import txDetailsImg from './images/tx_details.png';
import { migrate, revertMigration } from './logic/migrate';
import { useState } from 'react';
import { SafeStatus } from './logic/types';
import { loadSafeStatus } from './logic/status';
import { buildSafeTxLink } from './logic/constants';

function App() {

  const [safeAddress, setSafeAddress] = useState("")
  const [txLink, setTxLink] = useState("")
  const [safeStatus, setSafeStatus] = useState<SafeStatus | undefined>(undefined)
  const [showProgress, setShowProgress] = useState(false)
  const [migrationStatus, setMigrationStatus] = useState("")

  const handleMigrationButton = async () => {
    try {
      setShowProgress(true)
      const safeTxHash = await migrate(safeAddress, setMigrationStatus)
      setTxLink(buildSafeTxLink(safeAddress, safeTxHash))
    } catch (e) {
      console.error(e)
      setMigrationStatus("" + e)
    } finally {
      setShowProgress(false)
    }
  }

  const handleRevertButton = async () => {
    try {
      setShowProgress(true)
      const safeTxHash = await revertMigration(safeAddress, setMigrationStatus)
      setTxLink(buildSafeTxLink(safeAddress, safeTxHash))
    } catch (e) {
      console.error(e)
      setMigrationStatus("" + e)
    } finally {
      setShowProgress(false)
    }
  }

  const handleAddressInput = async (address: string) => {
    setSafeAddress(address)
    setSafeStatus(undefined)
    try {
      setShowProgress(true)
      setSafeStatus(await loadSafeStatus(address))
    } catch (e) {
      console.error(e)
    } finally {
      setShowProgress(false)
    }
  }

  return (
    <div className="App">
      <Typography variant="h4">Safe BSC Migrator</Typography>
      <Typography variant="h6">Motivation</Typography>
      <Typography variant="body1" maxWidth={800} padding={1}>
        With this web app it is possible to migrate to and from a version of Safe that does not emit any events when receiving native BNB to work around an issue on <b>BSC</b> that would make it under certain conditions impossible to receive native BNB from another contract.
      </Typography>
      <Typography variant="body1" maxWidth={800} padding={1}>
        More information can be found in the <Link href="https://github.com/rmeissner/safe-migrator#safe-migrator">repository</Link> of this project.
      </Typography>
      <Typography variant="h6">Guide</Typography>
      <Typography variant="body1" maxWidth={800} padding={1}>
        You require access to one of the owner wallets of the Safe that should be migrated.
      </Typography>
      <Typography variant="body1" maxWidth={800} padding={1}>
        Once an action has been triggered on the interface a Safe transaction hash needs to be signed. 
          Note: This step will NEVER trigger a transaction, therefore there is no need to own any BNB.
      </Typography>
      <Typography variant="body1" maxWidth={800} padding={1}>
        The transaction will be visible in the Gnosis Safe web interface and should be inspected before execution.
      </Typography>
      <Typography variant="h6">Transaction Details</Typography>
      <Typography variant="body1" maxWidth={800} padding={1}>
        The transaction triggered will use <b>delegate call</b> to interact with <Link href="https://www.bscscan.com/address/0x82b71f39d719cC971B80E7A7B6c0c2aF96a5abC1#code">0x82b71f39d719cC971B80E7A7B6c0c2aF96a5abC1</Link> and contain <b>0 BNB</b> of value. It will call either the method <b>migrate</b> or <b>revertMigration</b>.
      </Typography>
      <Typography variant="body1" maxWidth={800}>
        <img src={txDetailsImg} alt="Transaction Details" />
      </Typography>
      <Typography variant="caption">Example transaction details</Typography>
      <Typography variant="h6">Actions</Typography>
      <TextField value={safeAddress} onChange={(e) => handleAddressInput(e.target.value)} label="Safe Address" />
      <Container sx={{paddingTop: 4, textAlign: "center", maxWidth: 800, display: "flex", flexDirection: "column", alignItems: "center"}}>
        {
          !!migrationStatus && (
            <Typography variant="body1">
              {migrationStatus}
            </Typography>
          )
        }
        {
          showProgress && (<CircularProgress />)
        }
        { !!txLink && (
          <Link href={txLink}>Show transaction in Safe interface</Link>
        )}
        { !txLink && !showProgress && safeStatus && !safeStatus.fixEnabled && (
          <Button onClick={() => handleMigrationButton()}>Migrate To Workaround Version</Button>
        )}
        { !txLink && !showProgress && safeStatus && safeStatus.fixEnabled && (
          <Button onClick={() => handleRevertButton()}>Migrate To Official Version</Button>
        )}
      </Container>
    </div>
  );
}

export default App;
