const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('../../../utils'),
      { options, describe } = require('../../../lib/options/tasks/update');
      
class UpdateAssistantTask extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(UpdateAssistantTask);
        flags = normalizeFlags(flags);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistant-sid' is required`);
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
                                    message: 'Choose the Task to update: ',
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
            console.log(`Task "${tSid}" was updated`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err.message}`);
        }
    }
  
}

UpdateAssistantTask.description = describe;

UpdateAssistantTask.flags = Object.assign(
    convertYargsOptionsToOclifFlags(options),
    { profile: TwilioClientCommand.flags.profile }
)

module.exports = UpdateAssistantTask;
