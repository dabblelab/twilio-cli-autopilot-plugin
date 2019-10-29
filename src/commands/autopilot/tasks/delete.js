const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class DeleteAssistantTask extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(DeleteAssistantTask);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }

        const spinner = ora();
        try{

            const {assistantSid, taskSid} = flags;
            let tSid = taskSid;

            if(!taskSid){

                spinner.start(`Getting task list...`)
                const taskList = await AutopilotCore.tasks.list(this.twilioClient, assistantSid),
                        taskChoice = taskList.map(t => t.uniqueName);

                spinner.stop();
                if(!taskList.length){
                    console.log(`\n No Task found to delete \n Use "twilio autopilot:tasks:create" if you need to create a new task.`);
                    return;
                }
                const answer = await this.inquirer.prompt(
                            [
                                {
                                    type: 'list',
                                    name: 'taskUniqueName',
                                    message: 'Choose the Task to delete: ',
                                    choices: taskChoice
                                }
                            ]
                        );

                tSid = answer.taskUniqueName;

            }

            spinner.start('Deleting assistant task...\n');
            const task = await AutopilotCore.tasks.remove(this.twilioClient, assistantSid, tSid);
            spinner.stop();
            console.log(`Removed task with UniqueName: ${task.uniqueName}`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err.message}`);
        }
    }
  
}

DeleteAssistantTask.description = `Delete a Task of an assistant`;

DeleteAssistantTask.flags = Object.assign(
  {
    assistantSid : flags.string({
        char : 's',
        description : 'assistant that owns the task',
        required : true
    }),
    taskSid : flags.string({
        description : 'task sid'
    })
  },
  TwilioClientCommand.flags
)

module.exports = DeleteAssistantTask;
