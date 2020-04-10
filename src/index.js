const {
   generateFun
} = require('./generator');
const fse = require('fs-extra');


// naive way of thinking is to get the path of the json file and contracts .sol 
//get contract from path 
// if the contrct has address, then it's deployed , if not it's not





const serviceGen = async ({contractPath, provider} ) => {
   
   const dirFiles = await fse.readdir(contractPath)
   if(!await fse.pathExists('service')){
      await fse.mkdirSync('service')
   }
   const outputDir =  'service';
   dirFiles.map(async (file) => {

      const contract = await readArtifact(`${contractPath}/${file}`);
      const isDeployed = Object.keys(contract.networks).length === 0 && contract.networks.constructor === Object;
       const status = await generateFun(contract, provider, outputDir, contractPath, !isDeployed);

   })


}


const readArtifact = async (filePath) => {

   const obj = await fse.readJson(filePath, {
      throws: false
   })

   return obj;

}
module.exports = serviceGen
