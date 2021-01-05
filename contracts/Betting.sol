// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <=0.8.0;

contract Betting {
    address payable public owner;
    uint public minimumBet;
    uint public totalBetOne;
    uint public totalBetTwo;
    uint public numberOfBets;
    
    struct Player {
        uint amountBet;
        uint teamSelected;
    }
    
    address payable[] public players;
    mapping(address => Player) public playerInfo;
    
    modifier onlyOwner {
        require (msg.sender == owner);
        _;
    }
    
    constructor() {
        owner = msg.sender;
        minimumBet = 1000000000000;  //0.01 eth;
    }
    
    function kill() public onlyOwner {
        selfdestruct(owner);
    }
    
    function checkPlayerExist(address _player) public view returns (bool){
        for (uint i=0; i<players.length; i++){
            if (players[i] == _player) return true;
        }
        return false;
       
    }
    
    function bet(uint _team) public payable {
        require(!checkPlayerExist(msg.sender));
        require(msg.value >= minimumBet);
        require(_team == 1 || _team == 2);
        playerInfo[msg.sender] = Player(msg.value, _team);
        players.push(msg.sender);
        if(_team == 1){
            totalBetOne += msg.value;
        } else {
            totalBetTwo += msg.value;
        }
    }
    
    function distributePrizes(uint16 teamWinner) {
        
    }
    
    function getAmountOne() {
        
    }
    
    function getAmountTwo() {
        
    }
}