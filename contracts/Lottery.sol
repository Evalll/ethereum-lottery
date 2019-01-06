pragma solidity ^0.4.17;

contract Lottery {
    address public owner;
    address[] public players;
    
    function Lottery() public {
        owner = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .0001 ether);
        
        players.push(msg.sender);
    }
    
    function random() private view returns(uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }
    
    function pickWinner() public ownerOnly {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        
        players = new address[](0);
    }
    
    function getPlayers() public view returns(address[]) {
        return players;
    }
}