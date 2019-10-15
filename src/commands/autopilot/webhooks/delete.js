const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class DeleteAssistantWebhook extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(DeleteAssistantWebhook);
        

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }
        if (!flags.hasOwnProperty('webhookSid')) {
            console.log(`The '--webhookSid' is required`);
            return;
        }
        
        const spinner = ora().start('Deleting assistant webhooks...\n');
        try{

            const {assistantSid, webhookSid} = flags;

            const webhook = await AutopilotCore.webhooks.remove(this.twilioClient, assistantSid, webhookSid);

            spinner.stop();
            console.log(`Webhooks "${webhookSid}" was deleted.`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err}`);
        }
    }
  
}

DeleteAssistantWebhook.description = `Delete Assistant Webhooks`;

DeleteAssistantWebhook.flags = Object.assign(
  {
    assistantSid : flags.string({
        char : 's',
        description : 'assistant that owns the task',
        required : true
    }),
    webhookSid : flags.string({
        description : 'SID of the webhook to delete',
        required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = DeleteAssistantWebhook;
