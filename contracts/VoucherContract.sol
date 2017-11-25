pragma solidity ^ 0.4.11;

import "node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
//import "./Ownable.sol";
import "./YolCoin.sol";

contract YoloTEAMTokenInterface {
    function totalSupply() constant returns(uint totalSupply);
    function balanceOf(address _owner) public returns(uint balance);
    function transfer(address _to, uint _value) returns(bool success);
    function transferFrom(address _from, address _to, uint _value) returns(bool success);
    function transferToVoucher(address _fromSpender, address _toVoucher, uint _value) returns(bool success);
    function approve(address _spender, uint _value) returns(bool success);
    function voucherApprove(address _owner, address _spender, uint _value) returns(bool success);
    function allowance(address _owner, address _spender) constant returns(uint remaining);
    event Transfer(address indexed _from, address indexed _to, uint _value);
    event Approval(address indexed _owner, address indexed _spender, uint _value);
}

contract VoucherContract is Ownable {
    YoloTEAMTokenInterface YolCoin;

    address public YolCoinAddr;
    address public VoucherAddr = address(this);

    event contructor(uint256 _contruct);

    enum Stages {
        Active,
        Expired,
        Used
    }

    event state(uint _s);

    struct Voucher {
        uint256 _timeStamp;
        uint _expryTime;
        uint _amount;
        bytes32 _secretHash;
        Stages _status;
    }

    mapping(address => Voucher[]) vouchers;

    function createVoucher(uint _amount, uint _exday, uint _number) public {
        bytes32 hash = keccak256(_number, msg.sender);
        var newVoucher = Voucher(now, _exday, _amount, hash, Stages.Active);
        YolCoin.voucherApprove(msg.sender, VoucherAddr, _amount);
        //YolCoin.transferToVoucher(msg.sender, VoucherAddr, _amount);
        YolCoin.transferFrom(msg.sender, VoucherAddr, _amount);
        //ERC20 coin = ERC20(VoucherAddr);
        //if (!coin.transferFrom(msg.sender, VoucherAddr, _amount)) { throw; }
        vouchers[msg.sender].push(newVoucher);
    }

    function getVoucher(uint _index) constant returns(uint _amount, uint256 _secretHash, Stages _status) {
        if (now >= (uint(vouchers[address(msg.sender)][_index]._timeStamp) + 30 days)) {
            vouchers[msg.sender][_index]._status = Stages.Expired;
        }
        return (vouchers[msg.sender][_index]._amount, uint256(vouchers[msg.sender][_index]._secretHash), vouchers[msg.sender][_index]._status);
    }

    function myVoucher() constant returns(uint) {
        return vouchers[msg.sender].length;
    }

    function redeem(address _of, uint256 _hash) constant returns(bool) {
        if (_of == msg.sender) {
            return false;
        }
        if (now >= (uint(vouchers[address(_of)][_hash]._timeStamp) + 30 days)) {
            vouchers[address(_of)][_hash]._status = Stages.Expired;
            return false;
        }

        uint _amount = uint(vouchers[address(_of)][_hash]._amount);

        YolCoin.approve(msg.sender, _amount);
        ERC20 coin = ERC20(msg.sender);
        if (!coin.transferFrom(VoucherAddr, msg.sender, _amount)) {
            throw;
        }

        vouchers[address(_of)][_hash]._status = Stages.Used;
        return true;
    }

    function balanceOf(address _owner) public returns(uint256 balance) {
        return YolCoin.balanceOf(_owner);
    }

    function setYolCoinAddr(address _network) returns(address) {
        YolCoinAddr = _network;
        YolCoin = YoloTEAMTokenInterface(_network);
        return YolCoinAddr;
    }

    function setVoucherAddr(address _network) returns(address) {
        VoucherAddr = _network;
        return VoucherAddr;
    }

    function burnVoucher(uint256 _hash) constant returns(bool) {
        //if (vouchers[msg.sender][_hash]._status != Stages.Expired) { return false; }
        uint _amount = uint(vouchers[msg.sender][_hash]._amount);
        YolCoin.approve(msg.sender, _amount);
        ERC20 coin = ERC20(msg.sender);
        if (!coin.transferFrom(VoucherAddr, msg.sender, _amount)) {
            throw;
        }
        return true;
    }
}