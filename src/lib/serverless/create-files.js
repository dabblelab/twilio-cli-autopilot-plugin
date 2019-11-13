const fs = require('fs');
const { promisify } = require('util');
const open = promisify(fs.open);
const write = promisify(fs.write);
const rename = promisify(fs.rename);
const path = require('path');
const versions = require('./versions');

function createFile(fullPath, content) {
  return open(fullPath, 'wx').then(fd => {
    return write(fd, content);
  });
}

function createPackageJSON(pathName, name) {
  const fullPath = path.join(pathName, 'package.json');
  const packageJSON = JSON.stringify(
    {
      name: name,
      version: '0.0.0',
      private: true,
      scripts: {
        test: 'echo "Error: no test specified" && exit 1',
        start: 'twilio-run --env'
      },
      devDependencies: {
        'twilio-run': versions.twilioRun
      },
      engines: { node: versions.node }
    },
    null,
    2
  );
  return createFile(fullPath, packageJSON);
}

function createEnvFile(pathName, { accountSid, authToken }) {
  const fullPath = path.join(pathName, '.env');
  const content = `ACCOUNT_SID=${accountSid}
AUTH_TOKEN=${authToken}`;
  return createFile(fullPath, content);
}

module.exports = {
  createEnvFile,
  createPackageJSON
};
