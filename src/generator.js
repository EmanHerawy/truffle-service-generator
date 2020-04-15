const fs = require('fs');
const generateCode = (contract, provider, path , isDeployed) => {


    let func = [];

    contract.abi.map((item) => {
        if (item.type == "function") {

            let param = item.inputs.map(data => {
                return data.name;
            });

            const isConstant = ["pure", "view"].includes(item.stateMutability) || item.constant; // new form // deprecated case
            if (isConstant) {



                const tempFunc = getterFuncTemplate(item.name, param, isDeployed)

                func.push(tempFunc)

            } else {


                const tempFunc = setterFuncTemplate(item.name, param, isDeployed)

                func.push(tempFunc)

            }



        }
    });

    return classTemplate( `'${path.substring(process.cwd().length)}/${contract.contractName}.json';`, contract.contractName, provider, func);

}
const WriteJsFile = async (path, content) => {

    try {
        const obj = await fs.writeFile(path, content, data => console.log('Contract functions are written '))
        return true;
    } catch (error) {
        return false;

    }
    

}

const classTemplate = (path, name, providerUrl, functions) => {

    return template = `
import web3 from 'web3';
import contract from 'truffle-contract';

import contractArtifact from ${path}

export default class ${name}Service{

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
const getterFuncTemplate = (name, parmas, isDeployed) => {

    const status = isDeployed ? `.deployed()` : `.at(constractAddress)`
    let funcParam = [...parmas];
    if (!isDeployed) {
        funcParam.push("constractAddress");

    }

    return template = `
  async ${name}(${funcParam}){

        const instance = await this.service${status}; 

        const data = await instance.${name}.call(${parmas});

        return data;

}`
}
const setterFuncTemplate = (name, params, isDeployed) => {
    const status = isDeployed ? `.deployed()` : `.at(constractAddress)`
    let txParams = ['_from', '_gas']
    let funcParam = [...params, ...txParams];
    if (!isDeployed) {
        funcParam.push("constractAddress");

    }

    return template = `
  async ${name}(${funcParam}){    
        const instance = await this.service${status};
        const data = await  instance. ${name}(${[...params,...['{ from:_from, gas: _gas  }']]});  

        return data;
 
 
 }`
}
const generateFun = async (contract, provider, outputDir, path = null, isDeployed) => {
    const outputPath = `${outputDir}/${contract.contractName}.js`
    const sourceCode = generateCode(contract, provider, path, isDeployed).toString().replace(/},/g, '}');
    console.log('generateCode');

    return await WriteJsFile(outputPath, sourceCode);
};
module.exports = {
    generateFun
}