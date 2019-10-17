const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class CreateAssistantTask extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(CreateAssistantTask);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }

        if(!flags.uniqueName){
            console.log(`The '--uniqueName' is required`);
            return;
        }

        const spinner = ora().start('Creating assistant task...\n');
        try{

            const {assistantSid, uniqueName, friendlyName} = flags,
                  params = {
                      uniqueName : uniqueName,
                      friendlyName : friendlyName || ''
                  };

            const task = await AutopilotCore.tasks.create(this.twilioClient, assistantSid, params);
            spinner.stop();
            console.log(`Task with UniqueName: ${task.uniqueName} was created.`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err.message}`);
        }
    }
  
}

CreateAssistantTask.description = `Create a Task of an assistant`;

CreateAssistantTask.flags = Object.assign(
  {
    assistantSid : flags.string({
        char : 's',
        description : 'assistant that owns the task',
        required : true
    }),
    uniqueName : flags.string({
        description : 'unique name for task',
        required : true
    }),
    friendlyName : flags.string({
        description : 'friendly name'
    })
  },
  TwilioClientCommand.flags
)

module.exports = CreateAssistantTask;
