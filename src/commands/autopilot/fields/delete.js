const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class DeleteAssistantTaskField extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(DeleteAssistantTaskField);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
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
                                    message: 'Select task in which to delete: ',
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
                                    message: 'Select Field to delete: ',
                                    choices: fieldChoice
                                }
                            ]
                        );

                fSid = answer.fieldUniqueName;
            }

            spinner.start('Deleting task field...\n');
            const field = await AutopilotCore.fields.remove(this.twilioClient, assistantSid, tSid, fSid);
            spinner.stop();
            console.log(`Task field '${fSid}' was deleted.`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err.message}`);
        }
    }
  
}

DeleteAssistantTaskField.description = `Delete a field of a task`;

DeleteAssistantTaskField.flags = Object.assign(
  {
    assistantSid : flags.string({
        char : 's',
        description : 'assistant that owns the task',
        required : true
    }),
    taskSid : flags.string({
        description : 'task sid'
    }),
    fieldSid : flags.string({
        description : 'The Field Type of the new field. Can be: a [Built-in FieldType](https://www.twilio.com/docs/assistant/api/built-in-field-types ), the `unique_name`, or the `sid` of a custom Field Type.'
    })
  },
  TwilioClientCommand.flags
)

module.exports = DeleteAssistantTaskField;
