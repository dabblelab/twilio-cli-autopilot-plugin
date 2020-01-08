require('module-alias/register');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('@root/src/utils'),
      { options, describe } = require('@lib/options/fields/delete');
      
class DeleteAssistantTaskField extends TwilioClientCommand {
  
    async run() {
        await super.run();

        let { flags } = this.parse(DeleteAssistantTaskField);
        flags = normalizeFlags(flags);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistant-sid' is required`);
            return;
        }

        const spinner = ora();
        try{

            const {assistantSid, taskSid, fieldSid} = flags;
            let tSid = taskSid, fSid = fieldSid;

            if(!taskSid){

                spinner.start(`Getting task list...`)
                const taskList = await AutopilotCore.tasks.list(this.twilioClient, assistantSid),
                        taskChoice = taskList.map(t => t.uniqueName);

                spinner.stop();
                if(!taskList.length){
                    console.log(`\n No Task in which to delete fields \n Use "twilio autopilot:tasks:create" if you need to create a new task.`);
                    return;
                }
                const answer = await this.inquirer.prompt(
                            [
                                {
                                    type: 'list',
                                    name: 'taskUniqueName',
                                    message: 'Choose the Task your Field belongs to: ',
                                    choices: taskChoice
                                }
                            ]
                        );

                tSid = answer.taskUniqueName;
            }

            if(!fieldSid){

                spinner.start(`Getting task fields list...`)
                const fieldList = await AutopilotCore.fields.list(this.twilioClient, assistantSid, tSid),
                      fieldChoice = fieldList.map(f => f.uniqueName);

                spinner.stop();
                if(!fieldList.length){
                    console.log(`\n No Task Fields to delete \n Use "twilio autopilot:fields:create" if you need to create a new task field.`);
                    return;
                }
                const answer = await this.inquirer.prompt(
                            [
                                {
                                    type: 'list',
                                    name: 'fieldUniqueName',
                                    message: 'Choose the Field to delete: ',
                                    choices: fieldChoice
                                }
                            ]
                        );

                fSid = answer.fieldUniqueName;
            }

            spinner.start('Deleting task field...\n');
            const field = await AutopilotCore.fields.remove(this.twilioClient, assistantSid, tSid, fSid);
            spinner.stop();
            console.log(`Task field "${fSid}" was deleted`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err.message}`);
        }
    }
  
}

DeleteAssistantTaskField.description = describe;

DeleteAssistantTaskField.flags = Object.assign(
    convertYargsOptionsToOclifFlags(options),
    { profile: TwilioClientCommand.flags.profile }
)

module.exports = DeleteAssistantTaskField;
