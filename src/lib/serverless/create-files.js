const fs = require('fs');
const { promisify } = require('util');
const open = promisify(fs.open);
const write = promisify(fs.write);
const path = require('path');

function createFile(fullPath, content) {
  return open(fullPath, 'wx').then(fd => {
    return write(fd, content);
  });
}

function createEnvFile(pathName, { accountSid, authToken }) {
  const fullPath = path.join(pathName, '.env');
  const content = `ACCOUNT_SID=${accountSid}
AUTH_TOKEN=${authToken}`;
  return createFile(fullPath, content);
}

module.exports = {
  createEnvFile
};
