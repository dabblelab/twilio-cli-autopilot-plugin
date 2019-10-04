const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class ListAssistantTasks extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(ListAssistantTasks);
        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }
        const spinner = ora().start('Getting assistant tasks...\n');
        try{

            const fullData = await AutopilotCore.tasks.list(this.twilioClient, flags.assistantSid);
            spinner.stop();
            this.output(fullData, this.flags.properties);
        }catch(err){

            spinner.stop()
            
            console.error(`ERROR: ${err}`)
        }
    }
  
}

ListAssistantTasks.description = `List all tasks of an assistant`;

ListAssistantTasks.flags = Object.assign(
  {
    properties: flags.string({
      default: 'sid, uniqueName, friendlyName',
      description:
        'The Autopilot Assistant Task List.'
    }),
    assistantSid : flags.string({
        description : 'assistant sid',
        required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = ListAssistantTasks
