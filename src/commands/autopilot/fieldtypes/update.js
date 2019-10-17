const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class UpdateAssistantFieldType extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(UpdateAssistantFieldType);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }

        if(!(flags.fieldTypeSid || flags.uniqueName)){
            console.log(`The '--fieldTypeSid/uniqueName' is required`);
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
            console.log(`FieldType with UniqueName/Sid: ${uniqueName || sid} was updated.`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err.message}`);
        }
    }
  
}

UpdateAssistantFieldType.description = `Update a fieldtype of an assistant`;

UpdateAssistantFieldType.flags = Object.assign(
  {
    assistantSid : flags.string({
        char : 's',
        description : 'assistant sid',
        required : true
    }),
    fieldTypeSid : flags.string({
        description : 'field type sid',
        required : true
    }),
    uniqueName : flags.string({
        description : 'field type unique name to update'
    }),
    friendlyName : flags.string({
        description : 'field type friendly name to update'
    })
  },
  TwilioClientCommand.flags
)

module.exports = UpdateAssistantFieldType;
