// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <=0.8.0;

contract Betting {
    address payable public owner;
    uint public minimumBet;
    uint public totalBetsOne;
    uint public totalBetsTwo;
    
    address payable[1000] winners;
    uint count;
    
    struct Player {
        uint amountBet;
        uint teamSelected;
    }
    
    address payable[] players;
    mapping(address => Player) playerInfo;
    
    modifier onlyOwner {
        require (msg.sender == owner);
        _;
    }
    
    constructor() {
        owner = msg.sender;
        minimumBet = 1000000000000;  //0.01 eth;
    }
    
    // this function kill the constract
    function kill() public onlyOwner {
        selfdestruct(owner);
    }
    
    // this function check if an address already place a bet
    function checkPlayerExist(address _player) private view returns (bool){
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
            totalBetsOne += msg.value;
        } else {
            totalBetsTwo += msg.value;
        }
    }
    
    function distributePrizes(uint16 _teamWinner) public onlyOwner{
        for (uint i=0; i<players.length; i++) {
            if(playerInfo[players[i]].teamSelected == _teamWinner){
                winners[count] = players[i];
                count++;
            }
        }
        transferWinnings(_teamWinner);
        resetGame();
    }
    
    function transferWinnings(uint _teamWinner) private onlyOwner {
        uint loserBet;
        uint winnerBet;
        
        if (_teamWinner == 1){
            loserBet = totalBetsTwo;
            winnerBet = totalBetsOne;
        } else {
            loserBet = totalBetsOne;
            winnerBet = totalBetsTwo;
        }
        
        for (uint i=0; i<count; i++){
            if(winners[i] == address(0)) return;
            uint amountBet = playerInfo[winners[i]].amountBet;
            uint prize = amountBet*(1000+(loserBet*1000/winnerBet))/1000;
            
            // TRANSFER Winning price to user
            winners[i].transfer(prize);
        }
        
    }
    
    function resetGame() private onlyOwner {
        delete players;
        totalBetsOne = 0;
        totalBetsTwo = 0;
    }
    
    function getAmountOne() public view returns (uint) {
        return totalBetsOne;
    }
    
    function getAmountTwo() public view returns (uint) {
        return totalBetsTwo;
    }
}