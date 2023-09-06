:warning: This repository has been archived :warning:

[EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) and [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) have been activated on BNC, therefore the solutions descripted in the [help center article](https://help.safe.global/en/articles/40813-why-can-t-i-transfer-eth-from-a-contract-into-a-safe) of the Safe project can be used.

Note: the migration approach will not work anymore due to the increase of gas costs defined in [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929)

# Safe Migrator

This project is a simple web interface that migrates a Safe on the **BSC** network to a singleton that can receive native BNB.

:warning: **Only use this if you know what you are doing** :warning:

:warning: **The author of this repository doesn't provide any guarantees** :warning:

## Motivation

With version 1.3.0 of the Safe contracts an event has been added that is emitted each time the contract receives the native coin via a (internal) transaction. The addition of this event increased the gas costs when receiving the native coin. If the sending account is a contract that uses the Solidity `transfer` or `send` functionality to sent the native coin theses additional gas costs will result in an error. On Ethereum mainnet this can be solved useing the [access list feature (EIP-2930)](https://eips.ethereum.org/EIPS/eip-2930). As the Binance Smart Chain has **not** been updated yet to include this EIP another workaround was required.

For more information read our [helpcenter article](https://help.gnosis-safe.io/en/articles/5249851-why-can-t-i-transfer-eth-from-a-contract-into-a-safe) or the [Consensys Diligence blog post](https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/) on this.

## Work Around

To work around the issue an adjusted version of the 1.3.0 contracts has been deployed that does not emit an event when receiving the native coin. The address of this contract is [`0x4e6A0E034318Bec795c5E1dD4817A424767265A7`](https://www.bscscan.com/address/0x4e6A0E034318Bec795c5E1dD4817A424767265A7#code). As of 1.3.0 it is not possible to simply change the singleton (formerly master copy) address of the Safe. Therefore another contract was deployed to migrate a Safe to this version using delegate call. This migration contract is available at [`0x82b71f39d719cC971B80E7A7B6c0c2aF96a5abC1`](https://www.bscscan.com/address/0x82b71f39d719cC971B80E7A7B6c0c2aF96a5abC1#code).

Note: The BscFixMigration contract assumes that a Gnosis Safe Proxy has been used. This proxy stores the singleton address in the storage slot 0.

## Web App

As the Gnosis Safe web interface does not allow to create delegate call transaction it is required to use an alternative script or interface to propose this transaction. This is the purpose of this project. Once an owner is connected to the web app it is possible to propose a migration transaction to the **BSC** Safe interface. If this transaction is executed the Safe will be using the alternative singleton version. With that version it is possible to receive native BNB via `transfer` and `send` again, but it will not be registered by the indexing service anymore as an incoming transaction (the balance will still update after a while).

## Getting Started

* Checkout the project
```sh
git clone https://github.com/rmeissner/safe-migrator.git
```

* Open the project folder
```sh
cd safe-migrator
```

* Install correct node version (v16.9.1)
```sh
nvm install
```

* Install dependencies
```sh
yarn
```

* Start web app
```sh
yarn start
```

* Open web app on [http://localhost:3000](http://localhost:3000)

## Hosted version

A hosted version is available on [https://rimeissner.dev/safe-migrator](https://rimeissner.dev/safe-migrator)


## Security and Liability
All contracts are WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
