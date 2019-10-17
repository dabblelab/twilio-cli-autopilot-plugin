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

        const spinner = ora();
        try{

            const {assistantSid, taskSid, uniqueName, friendlyName} = flags;
            let tSid = taskSid;

            if(!taskSid){

                spinner.start(`Getting task list...`)
                const taskList = await AutopilotCore.tasks.list(this.twilioClient, assistantSid),
                        taskChoice = taskList.map(t => t.uniqueName);

                spinner.stop();
                if(!taskList.length){
                    console.log(`\n No Task found to update \n Use "twilio autopilot:tasks:create" if you need to create a new task.`);
                    return;
                }
                const answer = await this.inquirer.prompt(
                            [
                                {
                                    type: 'list',
                                    name: 'taskUniqueName',
                                    message: 'Choose your task in which to create: ',
                                    choices: taskChoice
                                }
                            ]
                        );

                tSid = answer.taskUniqueName;

            }

            spinner.start('Updating assistant task...\n');
            let params = {};

            if(uniqueName)
                params.uniqueName = uniqueName;
            
            if(friendlyName)
                params.friendlyName = friendlyName;

            if(Object.keys(params).length)
                await AutopilotCore.tasks.update(this.twilioClient, assistantSid, tSid, params);

            spinner.stop();
            console.log(`Task with UniqueName: ${taskSid} was updated.`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err.message}`);
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
        description : 'task sid'
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
