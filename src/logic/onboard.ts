import Onboard from 'bnc-onboard';
import { ethers } from 'ethers';

export let userProvider: ethers.providers.Web3Provider | undefined
export  const onboard = Onboard({
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