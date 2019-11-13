const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('../../../utils'),
      { options, describe } = require('../../../lib/options/fieldtypes/update');
      
class UpdateAssistantFieldType extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(UpdateAssistantFieldType);
        flags = normalizeFlags(flags);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistant-sid' is required`);
            return;
        }

        if(!(flags.fieldTypeSid || flags.uniqueName)){
            console.log(`The '--field-type-sid/unique-name' is required`);
            return;
        }

        const spinner = ora().start('Updating fieldtype...\n');
        try{

            const {assistantSid, fieldTypeSid, uniqueName, friendlyName} = flags;
            const sid = fieldTypeSid || uniqueName;
            let params = {};

            if(friendlyName)
                params.friendlyName = friendlyName;

            if(Object.keys(params).length)
                await AutopilotCore.fieldTypes.update(this.twilioClient, assistantSid, sid, params);

            spinner.stop();
            console.log(`FieldType "${uniqueName || sid}" was updated`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err.message}`);
        }
    }
  
}

UpdateAssistantFieldType.description = describe;

UpdateAssistantFieldType.flags = Object.assign(
    convertYargsOptionsToOclifFlags(options),
    { profile: TwilioClientCommand.flags.profile }
)

module.exports = UpdateAssistantFieldType;
