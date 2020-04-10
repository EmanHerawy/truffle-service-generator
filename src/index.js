const {
   generateFun
} = require('./generator');
const fse = require('fs-extra');
var path = require("path");


// naive way of thinking is to get the path of the json file and contracts .sol 
//get contract from path 
// if the contrct has address, then it's deployed , if not it's not





const serviceGen = async ({contractsBuildDir, provider} ) => {
  
   const service_path = path.resolve(path.join(contractsBuildDir,'../','../', 'service'));

   const dirFiles = await fse.readdir(contractsBuildDir)
   if(!await fse.pathExists(service_path)){
      await fse.mkdirSync(service_path)
   }
   const outputDir =  service_path;
   dirFiles.map(async (file) => {

      const contract = await readArtifact(`${contractsBuildDir}/${file}`);
      const isDeployed = Object.keys(contract.networks).length === 0 && contract.networks.constructor === Object;
       const status = await generateFun(contract, provider, outputDir, contractsBuildDir, !isDeployed);

   })


}


const readArtifact = async (filePath) => {

   const obj = await fse.readJson(filePath, {
      throws: false
   })

   return obj;

}
module.exports = serviceGen

