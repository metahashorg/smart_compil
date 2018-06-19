contract.contractUser = taxi.sender;
contract.transferFrom(user.sender, taxi.sender, 1);
contract.contractUser = admin.sender;
JSON.stringify(contract, '', 4)