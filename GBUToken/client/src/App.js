import React, { Component } from "react";
import GBUTokenContract from './contracts/GBUToken.json';
import getWeb3 from "./getWeb3";

import "./App.css";
class App extends Component{
  state = { web3: null, accounts: null, contract: null }; // 변수 추가
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      //const deployedNetwork = SimpleStorageContract.networks[networkId];
      const deployedNetwork = GBUTokenContract.networks[networkId];
      const instance = new web3.eth.Contract(
        GBUTokenContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  runExample = async () => {
    const { accounts, contract } = this.state;
    //const re_balance = await contract.methods.myToken(accounts).call();
    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();

    // Update state with the result.
    const tmp = contract.getAccounts();
    console.log(tmp);
    const re_balance="dd";
    this.setState({ storageValue: accounts,bal:re_balance});
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>my account is: {this.state.storageValue}</div>
        <div>my balance is : {this.state.bal}</div>
      </div>
    );
  }
}
export default App;