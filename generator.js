const fs = require('fs');
const generateDeployed = (contract, provider, path = null) => {


    let func = [];
 
    contract.abi.forEach((item) => {
        if (item.type == "function") {

            const isConstant = ["pure", "view"].includes(item.stateMutability) || item.constant; // new form // deprecated case
            if (isConstant) {

                let param = item.inputs.map(data => {
                    return data.name;
                });
        console.log(param,'parm');
        
                const tempFunc = getterFuncTemplate(item.name,param)

                func.push(tempFunc)

            } else {

                let param = item.inputs.map(data => {
                    return data.name;
                })
                const tempFunc = setterFuncTemplate(item.name,param)

                func.push(tempFunc)

            }



        }
    });
  
    return classTemplate(   !path ? `'build/contracts/${contract.contractName}.json';` : `'${path}/${contract.contractName}.json';`, contract.contractName, provider,func  );

}
const WriteJsFile = async (path, content) => {

    try {
        const obj = await fs.writeFile(path, content, data => console.log(data))
        return true;
    } catch (error) {
        return false;

    }
    //   console.log(obj) // => null
    //  return obj;

}

const generateFun = async (contract, provider, path = null, isDeployed) => {
    const outputPath = `./${contract.contractName}.js`

    if (isDeployed) {
        const sourceCode = generateDeployed(contract, provider, path).toString().replace(/},/g, '}');
        return await WriteJsFile(outputPath, sourceCode);
    } else {

    }
};


const classTemplate=(path,name,providerUrl,functions)=>{
return template=`
import web3 from 'web3';
import contract from 'truffle-contract';

import contractArtifact from
${path};

export default class ${name}Service
{

constructor() { 

this.web3Provider = new web3.providers.HttpProvider(
${providerUrl}
);

this.web3 = new web3(this.web3Provider);

this.initContract().then(s => {});

}

async initContract() {

this.service = contract(contractArtifact);

this.service.setProvider(this.web3Provider);

}

${functions}

}`
}
const getterFuncTemplate=(name,PARAM,isDeployed=true,address=null)=>{
    const status= isDeployed?`.deployed()`:`at(${address})`
return template=`
  async ${name}(${PARAM})
{

 const instance = await this.service${status}; 

 const data = await instance.${name}.call(${PARAM});

return data;

}`
}
const setterFuncTemplate=(name,funcParam,isDeployed=true,address=null)=>{
    const status= isDeployed?`.deployed()`:`at(${address})`
    const param= funcParam?`(${funcParam})`:``
return template=`
  async ${name}(${funcParam},_from,_gas)
{

 const instance = await this.service${status}

 .then(instance => {
 return instance. ${name}(${param},{ from:_from, gas: _gas  });  })
 
 .then(res => {
 
   return res;
 
    })
 
 .catch(e => {
 
   console.log(e);
 
    });
 
   return result;
 
 
 }`
}

module.exports = {
    generateFun
}