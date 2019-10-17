const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class ListAssistantFieldTypes extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(ListAssistantFieldTypes);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }

        const spinner = ora().start('Getting Assistant FieldTypes...\n');
        try{

            const {assistantSid} = flags;
            const fullData = await AutopilotCore.fieldTypes.list(this.twilioClient, assistantSid);
            spinner.stop();
            this.output(fullData, this.flags.properties);
        }catch(err){

            spinner.stop()
            
            console.error(`ERROR: ${err.message}`)
        }
    }
  
}

ListAssistantFieldTypes.description = `List all FieldTypes of an assistant`;

ListAssistantFieldTypes.flags = Object.assign(
  {
    properties: flags.string({
      default: 'sid, uniqueName',
      description:
        'The Autopilot Assistant FieldType List.'
    }),
    assistantSid : flags.string({
        char : 's',
        description : 'assistant sid',
        required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = ListAssistantFieldTypes
