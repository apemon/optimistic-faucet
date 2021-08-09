// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

pragma solidity >=0.6.0 <0.8.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Faucet is Ownable {
    mapping(address=>uint) public limits;
    uint public limit;
    uint public amount;
    address public eth_addr;
    
    constructor () {
        amount = 1e16;
        limit = 1 days;
        eth_addr = 0x4200000000000000000000000000000000000006;
    }
    
    function setAmount(uint _amount) onlyOwner public {
        amount = _amount;
    }

    function setLimit(uint _limit) onlyOwner public {
        limit = _limit;
    }
    
    function send(address _recipient) public {
        require(limits[_recipient] < block.timestamp, "hit limit rate");
        IERC20 erc20 = IERC20(eth_addr);
        erc20.transfer(_recipient, amount);
        limits[_recipient] = block.timestamp + limit;
    }
}