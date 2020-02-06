const contractSource = require("@truffle/contract-sources");
const {generateFun} = require('./generator');
const fse = require('fs-extra');


// naive way of thinking is to get the path of the json file and contracts .sol 
//get contract from path 
// if the contrct has address, then it's deployed , if not it's not



const generateDeployed=()=>{
    
}
const generateNonDeployed=()=>{

}
const readState=()=>{
    
}
const changeState=()=>{

};

const serviceGen=async (contractPath,isDeployed)=>{
const contract = await readArtifact(contractPath);

const status= await   generateFun(contract,"'127.0.0.1:8545'", null,isDeployed);
console.log(status,'jsCode');

}


 const readArtifact=async (filePath)=>{
 
        const obj = await fse.readJson(filePath, { throws: false })
      
     //   console.log(obj) // => null
        return obj;
      
}


serviceGen('build/contracts/Migrations.json',true).then(s=>{
   // console.log('reading file');
    
})