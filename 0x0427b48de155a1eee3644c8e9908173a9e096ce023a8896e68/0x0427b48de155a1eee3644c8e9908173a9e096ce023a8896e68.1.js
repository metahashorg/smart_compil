contract.contractUser = user.sender;
contract.transfer(taxi.sender, 1);
contract.approve(taxi.sender, 2);
JSON.stringify(contract, '', 4)