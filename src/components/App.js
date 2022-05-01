//import DStorage from '../abis/DStorage.json'
import React, { Component } from "react";
import Web3 from "web3";

import Dashboard from "./Layout";
import { ChakraProvider } from "@chakra-ui/react";
import DataContract from "../abis/DataContract.json";
//Declare IPFS
import Storage from "../abis/Storage.json";
import create from "ipfs-http-client";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values
// const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
// const ipfs = create("https://ipfs.infura.io:5001/api/v0");

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const balance = await web3.eth.getBalance(accounts[0]);

    this.setState({ balance: balance });

    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = DataContract.networks[networkId];
    if (networkData) {
      // Assign contract
      const dataContract = new web3.eth.Contract(
        DataContract.abi,
        networkData.address
      );
      this.setState({ dataContract });
      // Get files amount
      const contractCount = await dataContract.methods.contractCount().call();
      this.setState({ contractCount });
      // Load files&sort by the newest
      for (var i = contractCount; i >= 1; i--) {
        const contracts = await dataContract.methods.contracts(i).call();
        this.setState({
          contracts: [...this.state.filcontracts, contracts],
        });
      }
    } else {
      window.alert("DataContract not deployed to detected network.");
    }

    // Load DappToken
    const storageData = Storage.networks[networkId];
    if (storageData) {
      const storage = new web3.eth.Contract(Storage.abi, storageData.address);
      this.setState({ storage });
      // Get files amount
      const filesCount = await storage.methods.fileCount().call();
      this.setState({ filesCount });
      // Load files&sort by the newest
      for (var i = filesCount; i >= 1; i--) {
        const file = await storage.methods.files(i).call();
        this.setState({
          files: [...this.state.files, file],
        });
      }
    } else {
      window.alert("storage contract not deployed to detected network.");
    }
  }
  captureFile = (file) => {
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name,
      });
      console.log("buffer", this.state.buffer);
    };
  };

  async uploadFile(description) {
    // Add file to the IPFS
    try {
      const result = await ipfs.add(this.state.buffer);
      console.log(result[0].hash);
      console.log(result[0].size);

      this.setState({ loading: true });
      // Assign value for the file without extension
      if (this.state.type === "") {
        this.setState({ type: "none" });
      }
      this.state.storage.methods
        .uploadFile(
          result[0].hash,
          result[0].size,
          this.state.type,
          this.state.name,
          description
        )
        .send({ from: this.state.account })
        .on("transactionHash", (hash) => {
          this.setState({
            loading: false,
            type: null,
            name: null,
          });
          window.location.reload();
        })
        .on("error", (e) => {
          window.alert("Error");
          this.setState({ loading: false });
        });
    } catch (error) {
      console.error("IPFS error ", error);
    }
  }

  //Set states
  constructor(props) {
    super(props);
    this.state = {};
    this.uploadFile = this.uploadFile.bind(this);
    this.captureFile = this.captureFile.bind(this);
  }

  render() {
    return (
      <ChakraProvider>
        {this.state.loading ? (
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
        ) : (
          <Dashboard
            account={this.state.account}
            balance={this.state.balance}
            files={this.state.files}
            captureFile={this.captureFile}
            uploadFile={this.uploadFile}
          />
        )}
      </ChakraProvider>
    );
  }
}

export default App;
