## ``` Voruto - Blockchain Based User Centered Data Vault System ```

## Summary
Voruto is a decentralized service with Ethereum, an open-source, public permissionless blockchain as access and control system and regular centralized server for data storage. It will allow users to upload and store all their data securely and decentralizedly while provide decentralized user data access and control service.


## How to run the project
1. install ganache the virtual environment. https://trufflesuite.com/ganache/
2. use `npm i` to install all dependencies.
3. run `truffle migrate --reset` to deploy all smart contract to the blockchain
4. run `npm start` to start the frontend
5. the site will be accessable at http://localhost:3000/. *Note It requires browser MetaMask wallet to be able to run!*

## Technology
Development Environment: Ganache + Truffle
Frontend: React + Chakra UI + Web3.js
Backend: Solidity (0.5.0) + IPFS (Decentralized File Hosting)

## 🔧 Backend Blockchain Architecture:
![Project Diagram](https://ipfs.infura.io/ipfs/QmVnwDZ2bYj1wq3GY7wzGTrm2HCrqg74S4gLbQ7hXS7C3T)
*note: To simplify the smart contract for performance, we merged Bank.sol into DataContract.sol. 
The deposit function is implemented in OfferAContract and the withdraw function is implemented in SignAContract. 


## Disclaimer
The storage smart contract is adopted from https://github.com/dappuniversity/dstorage/tree/starter_code
