const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class ExportAssistantQueries extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(ExportAssistantQueries);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }

        if(!flags.quantity){
            console.log(`The '--quantity' is required`);
            return;
        }

        const spinner = ora().start('Exporting assistant queries...\n');
        try{

            const {assistantSid, quantity} = flags;

            await AutopilotCore.exportAssistantQueries(this.twilioClient, assistantSid, quantity);
            spinner.stop();
            console.log(`File exported in ${assistantSid}`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err.message}`);
        }
    }
  
}

ExportAssistantQueries.description = `Export queries of an assistant`;

ExportAssistantQueries.flags = Object.assign(
  {
    assistantSid : flags.string({
        char : 's',
        description : 'assistant that owns the task',
        required : true
    }),
    quantity : flags.string({
        char : 'q',
        description : 'number of queries to retrieve',
        required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = ExportAssistantQueries;
