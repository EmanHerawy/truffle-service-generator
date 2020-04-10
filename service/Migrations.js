
import web3 from 'web3';
import contract from 'truffle-contract';

import contractArtifact from 'build/contracts/Migrations.json';

export default class MigrationsService{

constructor() { 

this.web3Provider = new web3.providers.HttpProvider(
'http://127.0.0.1:8545'
);

this.web3 = new web3(this.web3Provider);

this.initContract().then(s => {});

}

async initContract() {

this.service = contract(contractArtifact);

this.service.setProvider(this.web3Provider);

}


  async last_completed_migration(){

        const instance = await this.service.deployed(); 

        const data = await instance.last_completed_migration.call();

        return data;

}
  async owner(){

        const instance = await this.service.deployed(); 

        const data = await instance.owner.call();

        return data;

}
  async setCompleted(completed,_from,_gas){    
        const instance = await this.service.deployed();
        const data = await  instance. setCompleted(completed,{ from:_from, gas: _gas  });  

        return data;
 
 
 }
  async upgrade(new_address,_from,_gas){    
        const instance = await this.service.deployed();
        const data = await  instance. upgrade(new_address,{ from:_from, gas: _gas  });  

        return data;
 
 
 }

}