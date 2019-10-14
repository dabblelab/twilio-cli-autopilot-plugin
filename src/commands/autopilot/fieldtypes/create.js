const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class CreateAssistantFieldType extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(CreateAssistantFieldType);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }

        if(!flags.uniqueName){
            console.log(`The '--uniqueName' is required`);
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
            console.log(`Field Type with UniqueName: ${uniqueName} was created.`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err}`);
        }
    }
  
}

CreateAssistantFieldType.description = `Create a field type of an assistant`;

CreateAssistantFieldType.flags = Object.assign(
  {
    assistantSid : flags.string({
        char : 's',
        description : 'assistant in which to create',
        required : true
    }),
    uniqueName : flags.string({
        description : 'unique name for the field type',
        required : true
    }),
    friendlyName : flags.string({
        description : 'friendly name for field type.'
    })
  },
  TwilioClientCommand.flags
)

module.exports = CreateAssistantFieldType;
