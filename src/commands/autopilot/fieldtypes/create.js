require('module-alias/register');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('@root/src/utils'),
      { options, describe } = require('@lib/options/fieldtypes/create');
      
class CreateAssistantFieldType extends TwilioClientCommand {
  
    async run() {
        await super.run();

        let { flags } = this.parse(CreateAssistantFieldType);
        flags = normalizeFlags(flags);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistant-sid' is required`);
            return;
        }

        if(!flags.uniqueName){
            console.log(`The '--unique-name' is required`);
            return;
        }

        const spinner = ora().start('Creating field type...\n');
        try{

            const {assistantSid, uniqueName, friendlyName} = flags;
            let params = {
                    uniqueName : uniqueName
                };

            if(friendlyName)
                params.friendlyName = friendlyName;

            const fieldType = await AutopilotCore.fieldTypes.create(this.twilioClient, assistantSid, params);
            spinner.stop();
            console.log(`Field Type "${uniqueName}" was created`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err.message}`);
        }
    }
  
}

CreateAssistantFieldType.description = describe;

CreateAssistantFieldType.flags = Object.assign(
    convertYargsOptionsToOclifFlags(options),
    { profile: TwilioClientCommand.flags.profile }
)

module.exports = CreateAssistantFieldType;
