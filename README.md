# @truffle/generate
=========

This plugin is to generate js web3 functions for all truffle contracts artifact 

Why do we need it ?
------------
To save your time :) 

# Proposed steps to work on this plugin

- run truffle migrate  if the contract is not compiled and migrated 
- should create js file for each contract in contract dir
-  should use " .deployed()" function if the contract is migrated 
-  should use " .at("contractAddress")" function if the contract is not migrated 
-  should use local network as default provider 
-  user can specify the network provider with --network tag 

# to use
- truffle migrate 
- npm run generate

# NOTE
this is inital setup and there are many edits should be done .


