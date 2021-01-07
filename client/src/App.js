import React, { Component } from 'react';
import Contract from './contracts/Betting.json';
import getWeb3 from './getWeb3';
import { Container, Row, Col } from 'react-bootstrap';

import Team from './components/Team.js';

import './App.css';

class App extends Component {
  state = { web3: null, accounts: null, contract: null };
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Contract.networks[networkId];
      const instance = new web3.eth.Contract(
        Contract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App section">
        <div>
          Welcome on my Ethereum Betting website <br />
          Your Wallet address is {this.state.accounts[0]}
        </div>
        <Container>
          <Row>
            <Col xs={6} sm={6}>
              <Team
                web3={this.state.web3}
                account={this.state.accounts[0]}
                contract={this.state.contract}
                team={1}
              />
            </Col>
            <Col xs={6} sm={6}>
              <Team
                web3={this.state.web3}
                account={this.state.accounts[0]}
                contract={this.state.contract}
                team={2}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
