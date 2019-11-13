const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('../../../utils'),
      { options, describe } = require('../../../lib/options/tasks/list');
      
class ListAssistantTasks extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(ListAssistantTasks);
        flags = normalizeFlags(flags);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistant-sid' is required`);
            return;
        }
        const spinner = ora().start('Getting assistant tasks...\n');
        try{

            const fullData = await AutopilotCore.tasks.list(this.twilioClient, flags.assistantSid);
            spinner.stop();
            this.output(fullData, this.flags.properties);
        }catch(err){

            spinner.stop()
            
            console.error(`ERROR: ${err.message}`)
        }
    }
  
}

ListAssistantTasks.description = describe;

ListAssistantTasks.flags = Object.assign(
    convertYargsOptionsToOclifFlags(options),
    { profile: TwilioClientCommand.flags.profile }
)

module.exports = ListAssistantTasks
