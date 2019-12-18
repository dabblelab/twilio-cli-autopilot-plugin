const fs = require('fs');
const { promisify } = require('util');
const open = promisify(fs.open);
const write = promisify(fs.write);
const rename = promisify(fs.rename);
const path = require('path');
const versions = require('./versions');

function createFile(fullPath, content) {
  // return open(fullPath, 'wx').then(fd => {
  //   return write(fd, content);
  // });
  try{
    return fs.writeFileSync(fullPath, content);
  }
  catch(err){
    throw err;
  }
}

function createPackageJSON(pathName, name) {
  const fullPath = path.join(pathName, 'package.json');
  let packageJSON = ``;

  if(fs.existsSync(fullPath)){

    let pkgJSON = require(fullPath);
    pkgJSON.name = name;
    packageJSON = JSON.stringify(pkgJSON, null, 2);
  }else{

    packageJSON = JSON.stringify(
      {
        name: name,
        version: '0.0.0',
        private: true,
        scripts: {
          test: 'echo "Error: no test specified" && exit 1'
        },
        engines: { node: versions.node }
      },
      null,
      2
    );
  }
  return createFile(fullPath, packageJSON);
}

function createEnvFile(pathName, { accountSid, authToken }) {
  const fullPath = path.join(pathName, '.env');
  const content = `ACCOUNT_SID=${accountSid}
AUTH_TOKEN=${authToken}`;
  return createFile(fullPath, content);
}

function updateSchemaFile(pathName, uniqueName){

  try{

    let fullPath = path.join(pathName, 'schema.json'),
        schemaJSON = require(fullPath);

    schemaJSON.uniqueName = uniqueName;

    return createFile(fullPath, JSON.stringify(schemaJSON, null, 2))
  }
  catch(err){
    throw err;
  }
}

function renameFile(oldPath, newPath){

  try{

    return fs.renameSync(oldPath, newPath);
  }catch(err){
    throw err;
  }
}

module.exports = {
  createEnvFile,
  createPackageJSON,
  renameFile,
  updateSchemaFile
};
