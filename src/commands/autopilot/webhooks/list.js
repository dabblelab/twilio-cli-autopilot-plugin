require('module-alias/register');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('@root/src/utils'),
      { options, describe } = require('@lib/options/webhooks/list');
      
class ListAssistantWebhooks extends TwilioClientCommand {
  
    async run() {
        await super.run();

        let { flags } = this.parse(ListAssistantWebhooks);
        flags = normalizeFlags(flags);

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
            
            console.error(`ERROR: ${err.message}`)
        }
    }
  
}

ListAssistantWebhooks.description = describe;

ListAssistantWebhooks.flags = Object.assign(
    convertYargsOptionsToOclifFlags(options),
    { profile: TwilioClientCommand.flags.profile }
)

module.exports = ListAssistantWebhooks;
