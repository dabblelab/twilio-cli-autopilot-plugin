const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class CreateAssistantWebhook extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(CreateAssistantWebhook);
        const eventTypes = {
            ondialoguestart : "onDialogueStart", 
            ondialogueend : "onDialogueEnd", 
            ondialoguetaskstart : "onDialogueTaskStart", 
            onactionsfetch : "onActionsFetch", 
            oncollectattempt : "onCollectAttempt"
        };
        const {assistantSid, webhookUniqueName, events, webhookURL, method} = flags;

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }
        if (!flags.hasOwnProperty('webhookUniqueName')) {
            console.log(`The '--webhookUniqueName' is required`);
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
            console.log(`Webhooks "${webhookUniqueName}" was created.`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err.message}`);
        }
    }
  
}

CreateAssistantWebhook.description = `Create Assistant Webhooks`;

CreateAssistantWebhook.flags = Object.assign(
  {
    assistantSid : flags.string({
        char : 's',
        description : 'assistant that owns the task',
        required : true
    }),
    webhookUniqueName : flags.string({
        char : 'w',
        description : 'unique name for webhook',
        required : true
    }),
    events : flags.string({
        char : 'e',
        description : 'list of space-separated webhook events',
        required : true
    }),
    webhookURL : flags.string({
        char : 'u',
        description : 'the URL to send events to',
        required : true
    }),
    method : flags.string({
        char : 'm',
        description : 'which HTTP method to use'
    })
  },
  TwilioClientCommand.flags
)

module.exports = CreateAssistantWebhook;
