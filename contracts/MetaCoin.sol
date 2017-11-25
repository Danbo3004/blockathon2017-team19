pragma solidity ^0.4.2;

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function MetaCoin() {
		balances[msg.sender] = 10000;
	}

	function transfer(address receiver, uint amount) returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		Transfer(msg.sender, receiver, amount);
		return true;
	}
	
	function transferFrom(address owner, address receiver, uint amount) returns(bool sufficient) {
		if (balances[owner] < amount) return false;
		balances[owner] -= amount;
		balances[receiver] += amount;
		Transfer(owner, receiver, amount);
		return true;
	}

	function balanceOf(address addr) returns(uint) {
		return balances[addr];
	}
}
