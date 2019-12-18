const fs = require('fs-extra'),
      {version} = require('./package.json');
const runScript = async() => {

    let readme = await fs.readFile('readmeText.txt', 'utf8');
    readme = readme.replace(/v1.0.0-beta.18/g, `v${version}`);
    await fs.outputFile('README.md', readme)
} 

runScript();