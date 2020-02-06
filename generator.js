const codeGen = require('./generator.json');
const fs = require('fs');
const generateDeployed = (contract, provider, path = null) => {


    let func = [];
    codeGen.class[5] = !path ? `'build/contracts/${contract.contractName}.json';` : `'${path}/${contract.contractName}.json';`;
    codeGen.class[8] = `${contract.contractName}Service`;
    codeGen.class[14] = `${provider}`;

    contract.abi.forEach((item) => {
        if (item.type == "function") {

            const isConstant = ["pure", "view"].includes(item.stateMutability) || item.constant; // new form // deprecated case
            if (isConstant) {
                const tempFunc = [...codeGen.getterFunctions]

                tempFunc[1] = item.name;
                let param = {
                    ...item.inputs.map(data => {
                        return data.name;
                    })
                };
                tempFunc[2] = item.inputs.lenght > 0 ? `(${param})` : "()";
                tempFunc[6] = ".deployed();";
                tempFunc[9] = item.name;
                console.log(tempFunc[11], 'tempFunc[11]');

                tempFunc[11] = item.inputs.lenght > 0 ? `(${param})` : "()";
                tempFunc[15] = "";
                console.log(tempFunc[11], 'tempFunc[11]');

                func.push(tempFunc)

            } else {
                const tempFunc = [...codeGen.setterFunctions]

                tempFunc[1] = item.name;
                let param = {
                    ...item.inputs.map(data => {
                        return data.name;
                    })
                };
                console.log(param, '');

                tempFunc[2] = item.inputs.lenght > 0 ?  `(${param},gas,from)` : "(gas,from)";
                console.log(tempFunc[2], 'tempFunc[2]');

                tempFunc[6] = ".deployed()";
                tempFunc[9] = item.name;
                tempFunc[11] = item.inputs.lenght > 0 ? `(${param})` : "()";

                func.push(tempFunc)

            }



        }
    });
    codeGen.class[31] = func;

    console.log(codeGen.class, 'codeGen');
    return codeGen.class;

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
const generateNonDeployed = (contract) => {
    contract.abi.forEach((item) => {
        if (item.type == "function") {

            const isConstant = ["pure", "view"].includes(item.stateMutability) || item.constant; // new form // deprecated case
            if (isConstant) {

            } else {

            }



        }
    });
}
const generateFun = async (contract, provider, path = null, isDeployed) => {
    const outputPath = `./${contract.contractName}.js`

    if (isDeployed) {
        const sourceCode = generateDeployed(contract, provider, path).toString().replace(/,/g, ' ');
        return await WriteJsFile(outputPath, sourceCode);
    } else {

    }
};




module.exports = {
    generateFun
}