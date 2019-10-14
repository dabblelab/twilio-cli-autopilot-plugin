const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class ListAssistantTaskFields extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(ListAssistantTaskFields);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }

        if (!flags.hasOwnProperty('taskSid')) {
            console.log(`The '--taskSid' is required`);
            return;
        }
        const spinner = ora().start('Getting task fields...\n');
        try{

            const {assistantSid, taskSid} = flags;
            const fullData = await AutopilotCore.fields.list(this.twilioClient, assistantSid, taskSid);
            spinner.stop();
            this.output(fullData, this.flags.properties);
        }catch(err){

            spinner.stop()
            
            console.error(`ERROR: ${err}`)
        }
    }
  
}

ListAssistantTaskFields.description = `List all fields of a task`;

ListAssistantTaskFields.flags = Object.assign(
  {
    properties: flags.string({
      default: 'sid, uniqueName, fieldType',
      description:
        'The Autopilot Assistant Task List.'
    }),
    assistantSid : flags.string({
        char : 's',
        description : 'assistant that owns the task',
        required : true
    }),
    taskSid : flags.string({
        description : 'task sid',
        required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = ListAssistantTaskFields
