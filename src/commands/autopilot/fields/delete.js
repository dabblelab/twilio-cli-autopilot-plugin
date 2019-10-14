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

        if(!flags.taskSid){
            console.log(`The '--taskSid' is required`);
            return;
        }

        if(!flags.fieldTypeSid){
            console.log(`The '--fieldTypeSid' is required`);
            return;
        }

        const spinner = ora().start('Deleting task field...\n');
        try{

            const {assistantSid, taskSid, fieldTypeSid} = flags;

            const field = await AutopilotCore.fields.remove(this.twilioClient, assistantSid, taskSid, fieldTypeSid);
            spinner.stop();
            console.log(`Task field with Sid: ${fieldTypeSid} was deleted.`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err}`);
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
        description : 'task sid',
        required : true
    }),
    fieldTypeSid : flags.string({
        description : 'The Field Type of the new field. Can be: a [Built-in FieldType](https://www.twilio.com/docs/assistant/api/built-in-field-types ), the `unique_name`, or the `sid` of a custom Field Type.',
        required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = DeleteAssistantTaskField;
