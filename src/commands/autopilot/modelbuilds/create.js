const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class CreateModelBuilds extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(CreateModelBuilds);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }

        const spinner = ora().start('Creating modelbuilds...\n');
        try{

            const {assistantSid, callbackURL} = flags;
            let modelbuilds = '';

            if(callbackURL)
                modelbuilds = await AutopilotCore.modelBuilds.create(this.twilioClient, assistantSid, {statusCallback : callbackURL});
            else
                modelbuilds = await AutopilotCore.modelBuilds.create(this.twilioClient, assistantSid);

            spinner.stop();
            console.log(`ModelBuild status : ${modelbuilds.status}`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err}`);
        }
    }
  
}

CreateModelBuilds.description = `Create Model Builds`;

CreateModelBuilds.flags = Object.assign(
  {
    assistantSid : flags.string({
        char : 's',
        description : 'assistant that owns the task',
        required : true
    }),
    callbackURL : flags.string({
        char : 'u',
        description : 'URL to get notified of model build status'
    })
  },
  TwilioClientCommand.flags
)

module.exports = CreateModelBuilds;
