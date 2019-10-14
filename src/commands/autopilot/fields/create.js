const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class CreateAssistantTaskField extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(CreateAssistantTaskField);

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

        if(!flags.uniqueName){
            console.log(`The '--uniqueName' is required`);
            return;
        }

        const spinner = ora().start('Creating task field...\n');
        try{

            const {assistantSid, taskSid, fieldTypeSid, uniqueName} = flags,
                  params = {
                      uniqueName : uniqueName,
                      fieldType : fieldTypeSid
                  };

            const field = await AutopilotCore.fields.create(this.twilioClient, assistantSid, taskSid, params);
            spinner.stop();
            console.log(`Task field with UniqueName: ${uniqueName} was created.`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err}`);
        }
    }
  
}

CreateAssistantTaskField.description = `Create field of a task`;

CreateAssistantTaskField.flags = Object.assign(
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
        description : 'field unique name',
        required : true
    }),
    fieldTypeSid : flags.string({
        description : 'The Field Type of the new field. Can be: a [Built-in FieldType](https://www.twilio.com/docs/assistant/api/built-in-field-types ), the `unique_name`, or the `sid` of a custom Field Type.',
        required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = CreateAssistantTaskField;
