const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('../../../../autopilot-core'),
      {createEnvFile} = require('../../lib/serverless/create-files'),
      {installDependencies} = require('../../lib/serverless/install-dependencies'),
      ora = require('ora'),
      path = require('path');

class InitAssistant extends TwilioClientCommand {

  async runCommand() {
    let spinner = await ora();

    try{

      let { flags, args } = this.parse(InitAssistant),
          clonedAssistant = '';


      let url = 'https://raw.githubusercontent.com/Mohammad-Khalid/autopilot-templates/master/Templates/templates.json';
        
      clonedAssistant = await AutopilotCore.cloneTemplate(url, false, 'Templates');

      const funcPath = path.join(clonedAssistant, 'function');
  
      spinner.start('Setting Up .evn file');
      let fullPath = `${path.resolve()}/${funcPath}`
  
      await createEnvFile(fullPath, { 
        accountSid : flags.accountSid || this.twilioClient.username,
        authToken : flags.authToken || this.twilioClient.password
      })
      spinner.succeed();

      spinner.start(`Installing dependencies`);
      await installDependencies(fullPath);
      spinner.succeed();
    }catch(err){

      spinner.fail()
    
      console.error(`ERROR: ${err}`)
    }
  }
}

InitAssistant.description = `Init autopilot bot template`;

InitAssistant.flags = Object.assign(
  {
    "accountSid" : flags.string({
      char : 'u',
      description : 'A specific account SID to be used for deployment'
    }),
    "authToken" : flags.string({
      description : 'Use a specific auth token for deployment'
    })
  },
  TwilioClientCommand.flags
)

module.exports = InitAssistant
