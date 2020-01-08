const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('../../../utils'),
      { options, describe } = require('../../../lib/options/modelbuilds/create');
      
class CreateModelBuilds extends TwilioClientCommand {
  
    async run() {
        await super.run();

        let { flags } = this.parse(CreateModelBuilds);
        flags = normalizeFlags(flags);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistant-sid' is required`);
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
            
            console.error(`ERROR: ${err.message}`);
        }
    }
  
}

CreateModelBuilds.description = describe;

CreateModelBuilds.flags = Object.assign(
    convertYargsOptionsToOclifFlags(options),
    { profile: TwilioClientCommand.flags.profile }
)

module.exports = CreateModelBuilds;
