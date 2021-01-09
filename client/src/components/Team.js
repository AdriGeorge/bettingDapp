import React, { useState, useEffect } from 'react';
import '../App.css';

export default function Team({ web3, contract, account, team }) {
  const [amount, setAmount] = useState('0');
  const [inputAmount, setInputAmount] = useState('');

  function handleChange(e) {
    setInputAmount(e.target.value);
  }

  useEffect(() => {
    getAmount();
  }, []);

  const getAmount = async () => {
    console.log('ciao');
    const result = await contract.methods
      .getAmount(team)
      .call({ from: account, gas: 1000000 });
    setAmount(web3.utils.fromWei(result.toString(), 'ether'));
    console.log(result);
  };

  const setWinner = async () => {
    console.log('im setting winner', team);
    await contract.methods.distributePrizes(team).send({
      from: account,
      gas: 1000000,
    });
    getAmount();
  };

  const bet = async () => {
    console.log("i'm betting");
    await contract.methods.bet(team).send({
      from: account,
      value: web3.utils.toWei(inputAmount.toString(), 'ether'),
    });
    getAmount();
  };

  return (
    <div>
      <h3>Team {team}</h3>
      <h4> Total amount : {amount} ETH</h4>
      <hr />
      <h5> Enter an amount to bet</h5>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          required
          pattern="[0-9]*[.,][0-9]*"
        />
        <span className="input-group-addon">ETH</span>
      </div>
      <br />
      <button variant="outline-secondary" onClick={bet}>
        Bet
      </button>
      <br />
      <hr />
      <button variant="outline-secondary" onClick={setWinner}>
        Make this team win
      </button>
    </div>
  );
}
