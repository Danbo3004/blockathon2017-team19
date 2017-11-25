pragma solidity ^0.4.18;

import "node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./YolCoin.sol";

contract YoloTEAMTokenInterface {
    function balanceOf(address _owner) view public returns (uint256);
    function transfer(address _to, uint256 _value) public returns (bool);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool);
}

contract VoucherContract is Ownable {
    YoloTEAMTokenInterface YolCoin1;
    
    address public YolNetwork;
    
    enum Stages {
        Active,
        Expired,
        Used
    }

    struct Voucher {
        uint256 _timeStamp;
        uint _expryDay;
        uint _amount;
        bytes32 _secretHash;
        Stages _status;
    }

    mapping(address => Voucher[]) vouchers;

    function createVoucher(uint _amount, uint _exday, uint _number) public {
        YolCoin yol;
        bytes32 hash = keccak256(_number, msg.sender);
        var newVoucher = Voucher(now, _exday, _amount, hash, Stages.Active);
        yol.transfer(this, _amount);
        vouchers[msg.sender].push(newVoucher);
    }

    function getVoucher(uint _index) constant returns (uint _amount, bytes32 _hash, Stages _status) {
        return (vouchers[msg.sender][_index]._amount, vouchers[msg.sender][_index]._secretHash, vouchers[msg.sender][_index]._status);
    }

    function myVoucher() constant returns (uint){
        return vouchers[msg.sender].length;
    }
    
    function redeem(uint256 _of, uint256 _hash) constant returns (bool){
        if (_of == _hash) {return false;}
        uint i;
        for(i=0; i<vouchers[address(_of)].length - 1; i++){
            if (vouchers[address(_of)][i]._secretHash != bytes32(_hash)) {return false;}
            if (now >= (uint(vouchers[address(_of)][i]._timeStamp) + 0 days)) {
                vouchers[msg.sender][i]._status = Stages.Expired;
                return false;
            }
        }
        
        YolCoin1.transferFrom(this, msg.sender, vouchers[address(_of)][i]._amount);
        vouchers[msg.sender][i]._status = Stages.Used;
        return true;
    }
    
    function balanceOf(address _owner) view public returns (uint256 balance) {
        return YolCoin1.balanceOf(_owner);
    }
    
    function setNetwork(address _network) returns(address){
        YolNetwork = _network;
        YolCoin1 = YoloTEAMTokenInterface(_network);
        return YolCoin1;
    }
    
    function burnVoucher(uint256 _of, uint256 _hash) constant returns (bool){
        uint i;
        for(i=0; i<vouchers[address(_of)].length - 1; i++){
            if (vouchers[address(_of)][i]._secretHash != bytes32(_hash)) {return false;}
        }
        
       
        if (vouchers[address(_of)][i]._status == Stages.Expired) {
            YolCoin1.transferFrom(this, address(_of), vouchers[address(_of)][i]._amount);
            return true;
        }
        
        return true;
    }
}

