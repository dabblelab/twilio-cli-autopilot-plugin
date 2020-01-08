require('module-alias/register');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('@root/src/utils'),
      { options, describe } = require('@lib/options/webhooks/create');
      
class CreateAssistantWebhook extends TwilioClientCommand {
  
    async run() {
        await super.run();

        let { flags } = this.parse(CreateAssistantWebhook);
        flags = normalizeFlags(flags);

        const eventTypes = {
            ondialoguestart : "onDialogueStart", 
            ondialogueend : "onDialogueEnd", 
            ondialoguetaskstart : "onDialogueTaskStart", 
            onactionsfetch : "onActionsFetch", 
            oncollectattempt : "onCollectAttempt"
        };
        const {assistantSid, webhookUniqueName, events, webhookURL, method} = flags;

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistant-sid' is required`);
            return;
        }
        if (!flags.hasOwnProperty('webhookUniqueName')) {
            console.log(`The '--webhook-unique-name' is required`);
            return;
        }
        if (!flags.hasOwnProperty('events')) {
            console.log(`The '--events' is required`);
            return;
        }
        if (!flags.hasOwnProperty('webhookURL')) {
            console.log(`The '--webhookURL' is required`);
            return;
        }

        const eventList = [... new Set(events.toLowerCase().trim().split(" "))];
        if(!eventList.length){
            console.log(`The '--events' argument must have an event.`);
            return;
        }

        const mEvents = eventList.filter(l => eventTypes.hasOwnProperty(l.toLowerCase()));
        if(!mEvents.length){
            console.log(`The '--events' paramater can contain one or all of the following values (space separtated).
            onDialogueStart
            onDialogueEnd
            onDialogueTaskStart
            onActionsFetch
            onCollectAttempt`);
            return;
        }

        const spinner = ora().start('Creating assistant webhooks...\n');
        try{

            
            let params = {
                uniqueName : webhookUniqueName,
                events : mEvents.join(" "),
                webhookUrl : webhookURL
            };

            if(method)
                params['webhookMethod'] = method;

            const webhook = await AutopilotCore.webhooks.create(this.twilioClient, assistantSid, params);

            spinner.stop();
            console.log(`Webhooks "${webhookUniqueName}" was created`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err.message}`);
        }
    }
  
}

CreateAssistantWebhook.description = describe;

CreateAssistantWebhook.flags = Object.assign(
    convertYargsOptionsToOclifFlags(options),
    { profile: TwilioClientCommand.flags.profile }
)

module.exports = CreateAssistantWebhook;
