const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class FetchAssistantTask extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(FetchAssistantTask);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }

        if(!(flags.taskSid || flags.uniqueName)){
            console.log(`The '--taskSid/uniqueName' is required`);
            return;
        }

        const spinner = ora().start('Getting assistant task detail...\n');
        try{

            const taskSid = flags.taskSid || flags.uniqueName;
            const fullData = await AutopilotCore.tasks.fetch(this.twilioClient, flags.assistantSid, taskSid);
            spinner.stop();
            this.output(fullData, this.flags.properties);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err}`);
        }
    }
  
}

FetchAssistantTask.description = `Task detail of an assistant`;

FetchAssistantTask.flags = Object.assign(
  {
    properties: flags.string({
      default: 'sid, uniqueName, friendlyName, actionsUrl',
      description:
        'The Autopilot Assistant Task Detail.'
    }),
    assistantSid : flags.string({
        description : 'assistant sid',
        required : true
    }),
    taskSid : flags.string({
        description : 'task sid'
    }),
    uniqueName : flags.string({
        description : 'task uniqueName'
    })
  },
  TwilioClientCommand.flags
)

module.exports = FetchAssistantTask;
