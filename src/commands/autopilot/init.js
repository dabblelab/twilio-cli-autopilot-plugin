const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      {createEnvFile, createPackageJSON, renameFile, updateSchemaFile} = require('../../lib/serverless/create-files'),
      {installDependencies} = require('../../lib/serverless/install-dependencies'),
      ora = require('ora'),
      path = require('path'),
      {camelCase, kebabCase, snakeCase} = require('lodash'),
      {cloneTemplate} = require("../../lib/serverless/clone-template");

const { options, describe } = require('../../lib/options/init'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('../../utils');

class InitAssistant extends TwilioClientCommand {

  async run() {
    await super.run();
    let spinner = await ora();

    try{

      let { flags } = this.parse(InitAssistant),
          clonedAssistant = '';

      flags = normalizeFlags(flags);

      // let url = 'https://raw.githubusercontent.com/Mohammad-Khalid/twilio-templates/master/templates.json';
        
      // clonedAssistant = await AutopilotCore.cloneTemplate(url, false, 'Templates', kebabCase(flags.botName) || false);

      clonedAssistant = await cloneTemplate(flags, this.inquirer);

      const funcPath = path.join(clonedAssistant, 'function');
  
      spinner.start('Setting Up .evn file');
      let fullPath = `${path.resolve()}/${funcPath}`
  
      await createEnvFile(fullPath, { 
        accountSid : flags.accountSid || this.twilioClient.username,
        authToken : flags.authToken || this.twilioClient.password
      })
      spinner.succeed();

      spinner.start('Setting Up package.json file');
  
      await createPackageJSON(fullPath, camelCase(clonedAssistant).toLowerCase())
      spinner.succeed();

      if(flags.botName){

        const schemaPath = path.join(clonedAssistant, 'model')
        await updateSchemaFile(`${path.resolve()}/${schemaPath}`, kebabCase(flags.botName));
      }

      spinner.start(`Installing dependencies`);
      await installDependencies(fullPath);
      spinner.succeed();
    }catch(err){

      spinner.fail()
    
      console.error(`ERROR: ${err}`)
    }
  }
}

InitAssistant.description = describe;

InitAssistant.flags = Object.assign(
  convertYargsOptionsToOclifFlags(options),
  { profile: TwilioClientCommand.flags.profile }
)

module.exports = InitAssistant
