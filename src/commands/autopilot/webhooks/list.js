const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class ListAssistantWebhooks extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(ListAssistantWebhooks);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }
        const spinner = ora().start('Getting assistant webhooks...\n');
        try{

            const {assistantSid} = flags;
            const fullData = await AutopilotCore.webhooks.list(this.twilioClient, assistantSid);
            spinner.stop();
            this.output(fullData, this.flags.properties);
        }catch(err){

            spinner.stop()
            
            console.error(`ERROR: ${err}`)
        }
    }
  
}

ListAssistantWebhooks.description = `List all webhooks of an assistant`;

ListAssistantWebhooks.flags = Object.assign(
  {
    properties: flags.string({
      default: 'sid, uniqueName, webhookUrl, events, dateCreated, dateUpdated, webhookMethod',
      description:
        'The Autopilot Assistant Webhooks List.'
    }),
    assistantSid : flags.string({
        char : 's',
        description : 'assistant that owns the task',
        required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = ListAssistantWebhooks;
