const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class UpdateAssistantWebhook extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(UpdateAssistantWebhook);
        const eventTypes = {
            ondialoguestart : "onDialogueStart", 
            ondialogueend : "onDialogueEnd", 
            ondialoguetaskstart : "onDialogueTaskStart", 
            onactionsfetch : "onActionsFetch", 
            oncollectattempt : "onCollectAttempt"
        };
        const {assistantSid, webhookSid, webhookUniqueName, events, webhookURL, method} = flags;

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }
        if (!flags.hasOwnProperty('webhookSid')) {
            console.log(`The '--webhookSid' is required`);
            return;
        }

        let mEvents = [];
        if(events){

            const eventList = [... new Set(events.toLowerCase().trim().split(" "))];
            if(eventList.length){

                mEvents = eventList.filter(l => eventTypes.hasOwnProperty(l.toLowerCase()));
                if(!mEvents.length){
                    console.log(`The '--events' paramater can contain one or all of the following values (space separtated).
                    onDialogueStart
                    onDialogueEnd
                    onDialogueTaskStart
                    onActionsFetch
                    onCollectAttempt`);
                    return;
                }
            }
            
        }
        

        const spinner = ora().start('Updating assistant webhooks...\n');
        try{

            
            let params = {
            };

            if(webhookUniqueName)
                params['uniqueName'] = webhookUniqueName;

            if(mEvents.length)
                params['events'] = mEvents.join(" ");

            if(webhookURL)
                params['webhookUrl'] = webhookURL;

            if(method)
                params['webhookMethod'] = method;

            const webhook = await AutopilotCore.webhooks.update(this.twilioClient, assistantSid, webhookSid, params);

            spinner.stop();
            console.log(`Webhooks "${webhook.uniqueName}" was updated.`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err}`);
        }
    }
  
}

UpdateAssistantWebhook.description = `Update Assistant Webhooks`;

UpdateAssistantWebhook.flags = Object.assign(
  {
    assistantSid : flags.string({
        char : 's',
        description : 'assistant that owns the task',
        required : true
    }),
    webhookSid : flags.string({
        description : 'SID of the webhook to update',
        required : true
    }),
    webhookUniqueName : flags.string({
        char : 'w',
        description : 'unique name for webhook to update'
    }),
    events : flags.string({
        char : 'e',
        description : 'list of space-separated webhook events to update'
    }),
    webhookURL : flags.string({
        char : 'u',
        description : 'the URL to send events to update',
        required : true
    }),
    method : flags.string({
        char : 'm',
        description : 'which HTTP method to use to update'
    })
  },
  TwilioClientCommand.flags
)

module.exports = UpdateAssistantWebhook;
