const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class UpdateAssistantTask extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(UpdateAssistantTask);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }

        if(!flags.taskSid){
            console.log(`The '--taskSid' is required`);
            return;
        }

        const spinner = ora().start('Updating assistant task...\n');
        try{

            const {assistantSid, taskSid, uniqueName, friendlyName} = flags;
            let params = {};

            if(uniqueName)
                params.uniqueName = uniqueName;
            
            if(friendlyName)
                params.friendlyName = friendlyName;

            if(Object.keys(params).length)
                await AutopilotCore.tasks.update(this.twilioClient, assistantSid, taskSid, params);

            spinner.stop();
            console.log(`Task with UniqueName: ${taskSid} was updated.`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err}`);
        }
    }
  
}

UpdateAssistantTask.description = `Update a Task of an assistant`;

UpdateAssistantTask.flags = Object.assign(
  {
    assistantSid : flags.string({
        char : 's',
        description : 'assistant that owns the task',
        required : true
    }),
    taskSid : flags.string({
        description : 'task sid',
        required : true
    }),
    uniqueName : flags.string({
        description : 'task unique name to update'
    }),
    friendlyName : flags.string({
        description : 'task friendly name to update'
    })
  },
  TwilioClientCommand.flags
)

module.exports = UpdateAssistantTask;
