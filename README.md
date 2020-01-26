# @truffle/generate

This package generate js web3 functions for deployed  contracts 

## this is an early stage contribution 

# Proposed steps to work on this package

- run truffle migrate  if the contract is not compiled and migrated 
- should create js file for each contract in contract dir
-  should use " .deployed()" function if the contract is migrated 
-  should use " .at("contractAddress")" function if the contract is not migrated 
-  should use local network as default provider 
-  user can specify the network provider with --network tag 

# package used
- @truffle/contract-schema to get contract abi
- @truffle/contract-sources to get .sol contracts in the contract directory to only generate js functions for developed contracts