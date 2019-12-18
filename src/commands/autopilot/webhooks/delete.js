const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('../../../utils'),
      { options, describe } = require('../../../lib/options/webhooks/delete');
      
class DeleteAssistantWebhook extends TwilioClientCommand {
  
    async run() {
        await super.run();

        let { flags } = this.parse(DeleteAssistantWebhook);
        flags = normalizeFlags(flags);
        

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistant-sid' is required`);
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
                                    message: 'Select the webhook you want to delete: ',
                                    choices: webhookChoice
                                }
                            ]
                        );

                wSid = answer.webhookUniqueName;

            }

            spinner.start('Deleting assistant webhooks...\n');
            const webhook = await AutopilotCore.webhooks.remove(this.twilioClient, assistantSid, wSid);

            spinner.stop();
            console.log(`Webhooks "${wSid}" was deleted`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err.message}`);
        }
    }
  
}

DeleteAssistantWebhook.description = describe;

DeleteAssistantWebhook.flags = Object.assign(
    convertYargsOptionsToOclifFlags(options),
    { profile: TwilioClientCommand.flags.profile }
)

module.exports = DeleteAssistantWebhook;
