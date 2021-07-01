# shoutouts.eth

![logo](shoutout-custom.png)

<!--omit in toc -->
## Table of Contents

1. [Table of Contents](#table-of-contents)
1. [Backend](#backend)
   1. [Set Up Development Environment](#set-up-development-environment)
   1. [Create Base Project](#create-base-project)
   1. [Create Infura Account](#create-infura-account)
   1. [Create Pinata Account](#create-pinata-account)
   1. [Copy Mnemonic from MetaMask](#copy-mnemonic-from-metamask)
   1. [Install Project Dependencies](#install-project-dependencies)
   1. [Create Contract and Migration](#create-contract-and-migration)
   1. [Create NFT Image](#create-nft-image)
   1. [Create Sample Metadata File](#create-sample-metadata-file)
   1. [Compile Contract](#compile-contract)
   1. [Migrate to Rinkeby Network](#migrate-to-rinkeby-network)
   1. [Test Deployed Contract in Console](#test-deployed-contract-in-console)
   1. [Verify the Shoutout on the Blockchain](#verify-the-shoutout-on-the-blockchain)
   1. [Add New Token to MetaMask](#add-new-token-to-metamask)
   1. [Deploy Entire DApp to Fleek](#deploy-entire-dapp-to-fleek)
1. [Frontend](#frontend)
   1. [Setup Front End Codebase](#setup-front-end-codebase)
   1. [Add Default Builder to Config](#add-default-builder-to-config)
   1. [Implement Front End Javascript](#implement-front-end-javascript)
   1. [Truffle Build: Compile `app` Directory](#truffle-build%3A-compile-%60app%60-directory)
   1. [Truffle Serve: Serve `app` Directory](#truffle-serve%3A-serve-%60app%60-directory)
   1. [Open in MetaMask-Enabled Browser](#open-in-metamask-enabled-browser)
1. [References](#references)

## Backend

### Set Up Development Environment

1. Install Truffle: `npm install -g truffle`
1. Install Ganache: `npm install -g ganache-cli`
1. Install Fleek: `npm install -g @fleekhq/fleek-cli`
1. Download and install the IPFS CLI by following [these instructions](https://docs.ipfs.io/install/command-line/#official-distributions).
1. Install the [Blockchain Development Kit for Ethereum](https://marketplace.visualstudio.com/items?itemName=AzBlockchain.azure-blockchain) extension in VSCode.


### Create Base Project

```bash
mkdir shoutouts.eth
cd shoutouts.eth
truffle init
npm init
cp .env.sample .env
```

### Create Infura Account

1. <infura.io>: Sign up and create a new project. Give it the same name as your codebase.
1. Under the Keys heading, copy `Project Secret` to your clipboard.
1. Open your `.env` file and paste the key to the right of `INFURA_KEY=`.

### Create Pinata Account

1. Visit <pinata.cloud> and create a new account.
1. Click API Keys on left sidebar.
1. Click `New Key`
1. Turn on `Admin` level access.
1. The name of the key should match the project name.
1. Click `Create Key`. A modal dialog will appear. Click `Copy All` and store the values somewhere safe, like in a password manager.
1. Copy `JWT` to the clipboard.


### Copy Mnemonic from MetaMask

1. Open Chrome and log in to MetaMask.
1. Click Account Icon on Top Right > Choose `Settings` > `Security & Privacy`
1. Click `Reveal Secret Recovery Phrase` and enter your MetaMask password.
1. Copy the phrase to your clipboard.
1. Open your `.env` file and paste the mnemonic to the right of `MNEMONIC=`.

### Install Project Dependencies

```bash
npm install @openzeppelin/contracts dotenv @truffle/hdwallet-provider@1.2.3
```

### Create Contract and Migration

```bash
touch contracts/ShoutoutContract.sol
touch migrations/2_deploy_contracts.js
```

### Create NFT Image

1. Visit https://badge.design to generate an image for your new token.
1. Save a transparent PNG of the image in the root of your project.
1. Open the IPFS Desktop application.
1. Add the image to IPFS:

   ```bash
   $ ipfs init
   generating ED25519 keypair...done
   peer identity: 12D3KooWK9J7NfuE9wGKWpERRLWDhcpUwhfduu4osbhV2TamQeRZ
   initializing IPFS node at /Users/droxey/.ipfs


   $ ipfs daemon
   Initializing daemon...
   go-ipfs version: 0.9.0
   Repo version: 11
   System version: arm64/darwin
   Golang version: go1.16.5
   Swarm listening on /ip4/127.0.0.1/tcp/4001
   Swarm listening on /ip4/127.0.0.1/udp/4001/quic
   Swarm listening on /ip4/192.168.0.118/tcp/4001
   Swarm listening on /ip4/192.168.0.118/udp/4001/quic
   Swarm listening on /ip4/192.168.0.173/tcp/4001
   Swarm listening on /ip4/192.168.0.173/udp/4001/quic
   Swarm listening on /ip6/::1/tcp/4001
   Swarm listening on /ip6/::1/udp/4001/quic
   Swarm listening on /ip6/fdc4:67f5:8ffa:3:144b:dbb3:b143:89a0/tcp/4001
   Swarm listening on /ip6/fdc4:67f5:8ffa:3:144b:dbb3:b143:89a0/udp/4001/quic
   Swarm listening on /ip6/fdc4:67f5:8ffa:3:cf5:b55b:8447:a756/tcp/4001
   Swarm listening on /ip6/fdc4:67f5:8ffa:3:cf5:b55b:8447:a756/udp/4001/quic
   Swarm listening on /p2p-circuit
   Swarm announcing /ip4/127.0.0.1/tcp/4001
   Swarm announcing /ip4/127.0.0.1/udp/4001/quic
   Swarm announcing /ip4/192.168.0.173/tcp/4001
   Swarm announcing /ip4/192.168.0.173/udp/4001/quic
   Swarm announcing /ip4/71.204.188.97/udp/4001/quic
   Swarm announcing /ip6/::1/tcp/4001
   Swarm announcing /ip6/::1/udp/4001/quic
   API server listening on /ip4/127.0.0.1/tcp/5001
   WebUI: http://127.0.0.1:5001/webui
   Gateway (readonly) server listening on /ip4/127.0.0.1/tcp/8080
   Daemon is ready
   ```

1. In a new terminal tab, run `ipfs add shoutout.png` to add the token's image to IPFS:

   ```bash
   $ ipfs add shoutout.png
   added QmRGhvqTPvx8kgMSLFdPaCysKvhtP5GV5MsKDmTx3v2QxT shoutout.png
   10.79 KiB / 10.79 KiB [=======================================================================================================================================================] 100.00%
   ```

   Copy the hash you receive when adding the image. This is the address of your image in IPFS.

1. Pin the image in Pinata:

   ```bash
   $ ipfs pin remote service add pinata https://api.pinata.cloud/psa PASTE_JWT_KEY
   $ ipfs pin remote add --service=pinata --name=shoutout.png QmRGhvqTPvx8kgMSLFdPaCysKvhtP5GV5MsKDmTx3v2QxT
   ```

### Create Sample Metadata File

This sample metadata can be used prior to developing a metadata API, and exists to prove that we can mint our token successfully.

1. Add the file to IPFS:

   ```bash
   $ ipfs add sample-metadata.json
   added QmVGmwHFxzcrdygWMKPdqp3Q37BBNsGc4M1f6KVRitJ49j sample-metadata.json
   196 B / 196 B [===============================================================================================================================================================] 100.00%
   ```

1. Pin the file in Pinata:

   ```bash
   $ ipfs pin remote add --service=pinata --name=sample-metadata.json QmVGmwHFxzcrdygWMKPdqp3Q37BBNsGc4M1f6KVRitJ49j
   CID:    QmVGmwHFxzcrdygWMKPdqp3Q37BBNsGc4M1f6KVRitJ49j
   Name:   sample-metadata.json
   Status: pinned
   ```

### Compile Contract

```bash
$ truffle compile

Compiling your contracts...
===========================

> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/ShoutoutContract.sol
> Compiling @openzeppelin/contracts/token/ERC721/ERC721.sol
> Compiling @openzeppelin/contracts/token/ERC721/IERC721.sol
> Compiling @openzeppelin/contracts/token/ERC721/IERC721Receiver.sol
> Compiling @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol
> Compiling @openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol
> Compiling @openzeppelin/contracts/utils/Address.sol
> Compiling @openzeppelin/contracts/utils/Context.sol
> Compiling @openzeppelin/contracts/utils/Counters.sol
> Compiling @openzeppelin/contracts/utils/Strings.sol
> Compiling @openzeppelin/contracts/utils/introspection/ERC165.sol
> Compiling @openzeppelin/contracts/utils/introspection/IERC165.sol

> Artifacts written to /Users/droxey/dev/repos/shoutouts.eth/build/contracts
> Compiled successfully using:
   - solc: 0.8.0+commit.c7dfd78e.Linux.g++
```

### Migrate to Rinkeby Network

```bash
$ truffle migrate --network rinkeby

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 10000000 (0x989680)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x3d7e525301cb45c617ddfc1977397e9f5ee74b1f4679851ada897994bf08e9e4
   > Blocks: 1            Seconds: 12
   > contract address:    0xAf47d95c283b8d0333ADEDAF0bB22916ceFFA7FB
   > block number:        8841341
   > block timestamp:     1624856784
   > account:             0xe4233b38fEa3B8c27ea9F54d5A90ec27cEe7F42C
   > balance:             1.556150107
   > gas used:            251534 (0x3d68e)
   > gas price:           1 gwei
   > value sent:          0 ETH
   > total cost:          0.000251534 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 8841342)
   > confirmation number: 2 (block: 8841343)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.000251534 ETH


2_deploy_contracts.js
=====================

   Deploying 'ShoutoutContract'
   ----------------------------
   > transaction hash:    0xea92115a2eb4d8d6164bcbb52714e7c42fccb9de09a060457b128fcf1877ffc6
   > Blocks: 1            Seconds: 12
   > contract address:    0x001Fd4dd63455F327BE312C6bf7c77c5A63BEe9e
   > block number:        8841345
   > block timestamp:     1624856844
   > account:             0xe4233b38fEa3B8c27ea9F54d5A90ec27cEe7F42C
   > balance:             1.553639137
   > gas used:            2465052 (0x259d1c)
   > gas price:           1 gwei
   > value sent:          0 ETH
   > total cost:          0.002465052 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 8841346)
   > confirmation number: 2 (block: 8841347)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.002465052 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.002716586 ETH
```

### Test Deployed Contract in Console

```bash
$ truffle console --network rinkeby
truffle(rinkeby)> let instance = await ShoutoutContract.deployed()
truffle(rinkeby)> let result = await instance.awardItem("0xe4233b38fEa3B8c27ea9F54d5A90ec27cEe7F42C", "https://gateway.pinata.cloud/ipfs/QmVGmwHFxzcrdygWMKPdqp3Q37BBNsGc4M1f6KVRitJ49j")
```

### Verify the Shoutout on the Blockchain

1. Open https://rinkeby.etherscan.io
1. Paste the deployed contract address in the search bar or visit <https://rinkeby.etherscan.io/address/DEPLOYED_CONTRACT_ADDRESS>  (https://rinkeby.etherscan.io/address/0x001Fd4dd63455F327BE312C6bf7c77c5A63BEe9e)
1. Should see two transactions --- one to create the contract, and one to award an item.

### Add New Token to MetaMask

1. Open MetaMask and click Add Token
1. Paste the deployed contract address in the `Token Contract Address` field.
1. Set Token Decimal to 0.
1. Click `Next`
1. Click `Add Token`

### Deploy Entire DApp to Fleek

1. Visit <fleek.co> in your browser and create an account.
1. Run `fleek login` to sign in from your terminal before initializing or deploying.
1. Initialize fleek for your project:

   ```bash
   $ fleek site:init
   'This command will walk you through initializing a new or existing fleek site config in the current directory.'

   'Successfully initializing a site would create a .fleek.json file in your directory.'
   'You can then use `fleek site:deploy` to deploy changes made to your publish directory.'

   ? Which team you wanna use? username-team
   ...fetching list of sites for team: username-team
   ? Which site you wanna use? Create new site
   ? Select the public directory for deployment ('.' for current directory): .
   publishing files in /Users/droxey/dev/repos/shoutouts.eth to IPFS
   packaging site contents...
   uploading...
   Site cid is QmULzpjfa3CbBRktd2744jXYqWbYjkHTYd9sbvthzkTkzx
   creating new site
   Fleek site late-dust-7939 was successfully initialized.
   ```

1. Deploy the entire project to IPFS:

   ```bash
   $ fleek site:deploy
   publishing files in /Users/droxey/dev/repos/shoutouts.eth to IPFS
   packaging site contents...
   uploading...
   Site cid is QmTRnEN27nJLpXFiXEZ8NTr4wE4q5ssg9F9hqztnHrjYso
   New deployment has been triggered.
   View deployment here: https://app.fleek.co/#/sites/late-dust-7939/deploys/2021-06-28T04:34:52.361Z?accountId=username-team
   ```

## Frontend

### Setup Front End Codebase

1. Add `app` folder to project. Name is important!
1. Add  `app/js/index.js` to the project
1. Add `app/index.html` to the project

### Add Default Builder to Config

1. Add default builder to project

```bash
npm install truffle-default-builder
```

1. Import `truffle-default-builder` at the top of `truffle-config.js`:

   ```js
   var DefaultBuilder = require("truffle-default-builder");
   ```

1. Configure the builder using the `build` directive in `truffle-config.js`. Paste the following code below the definition for `networks`:

   ```js
      build: new DefaultBuilder({
         "index.html": "index.html",
         "app.js": [
            "js/index.js"
         ]
   })
   ```

### Implement Front End Javascript

Located in `app/js/index.js`.

### Truffle Build: Compile `app` Directory

```bash
truffle build
```

### Truffle Serve: Serve `app` Directory

```bash
truffle serve
```

### Open in MetaMask-Enabled Browser

Visit <http://localhost:8080> in your browser to test your new full stack DApp!

## References

- [Building Blockchain Projects by Narayan Prusty](https://learning.oreilly.com/library/view/building-blockchain-projects)
- [Get Started With Ethereum by Davi Bauer](https://leanpub.com/getstartedwithethereum)
