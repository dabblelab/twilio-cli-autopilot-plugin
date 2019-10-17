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
        
        const spinner = ora();
        try{

            const {assistantSid, webhookSid} = flags;
            let wSid = webhookSid;

            if(!webhookSid){

                spinner.start(`Getting webhook list...`);
                const webhookList = await AutopilotCore.webhooks.list(this.twilioClient, assistantSid),
                        webhookChoice = webhookList.map(t => t.uniqueName);

                spinner.stop();

                if(!webhookList.length){
                    console.log(`\n No webhook found to delete \n Use "twilio autopilot:webhooks:create" if you need to create a new webhook.`);
                    return;
                }
                const answer = await this.inquirer.prompt(
                            [
                                {
                                    type: 'list',
                                    name: 'webhookUniqueName',
                                    message: 'Choose your webhook in which to create: ',
                                    choices: webhookChoice
                                }
                            ]
                        );

                wSid = answer.webhookUniqueName;

            }

            spinner.start('Deleting assistant webhooks...\n');
            const webhook = await AutopilotCore.webhooks.remove(this.twilioClient, assistantSid, wSid);

            spinner.stop();
            console.log(`Webhooks "${wSid}" was deleted.`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err.message}`);
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
        description : 'SID of the webhook to delete'
    })
  },
  TwilioClientCommand.flags
)

module.exports = DeleteAssistantWebhook;
