//import DStorage from '../abis/DStorage.json'
import React, { Component } from "react";
import Web3 from "web3";

import Dashboard from "./Layout";
import { ChakraProvider } from "@chakra-ui/react";
import DataContract from "../abis/DataContract.json";
//Declare IPFS

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
      const filesCount = await dataContract.methods.contractCount().call();
      this.setState({ filesCount });
      // Load files&sort by the newest
      for (var i = filesCount; i >= 1; i--) {
        const file = await dataContract.methods.files(i).call();
        this.setState({
          files: [...this.state.files, file],
        });
      }
    } else {
      window.alert("DStorage contract not deployed to detected network.");
    }
  }
  // Get file from user
  captureFile = (event) => {};

  //Upload File
  uploadFile = (description) => {
    //Add file to the IPFS
    //Check If error
    //Return error
    //Set state to loading
    //Assign value for the file without extension
    //Call smart contract uploadFile function
  };

  //Set states
  constructor(props) {
    super(props);
    this.state = {};

    //Bind functions
  }

  render() {
    return (
      <ChakraProvider>
        {/* <Navbar account={this.state.account} /> */}
        {this.state.loading ? (
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
        ) : (
          <Dashboard account={this.state.account} />
          // <Main
          //   files={this.state.files}
          //   captureFile={this.captureFile}
          //   uploadFile={this.uploadFile}
          // />
        )}
      </ChakraProvider>
    );
  }
}

export default App;
