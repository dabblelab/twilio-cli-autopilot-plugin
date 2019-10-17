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

        if(!flags.uniqueName){
            console.log(`The '--uniqueName' is required`);
            return;
        }

        const spinner = ora();
        try{

            const {assistantSid, taskSid, fieldTypeSid, uniqueName} = flags,
                  params = {
                      uniqueName : uniqueName,
                      fieldType : fieldTypeSid
                  };
            let tSid = taskSid, fSid = fieldTypeSid;

            if(!taskSid){

                spinner.start(`Getting task list...`)
                const taskList = await AutopilotCore.tasks.list(this.twilioClient, assistantSid),
                        taskChoice = taskList.map(t => t.uniqueName);

                spinner.stop();
                if(!taskList.length){
                    console.log(`\n No Task \n Use "twilio autopilot:tasks:create" if you need to create a new task.`);
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

            if(!fieldTypeSid){

                console.log(`\nUse 'twilio autopilot:fieldtypes:create' if you need to create a new field type.\n`);
                spinner.start('Getting Field Types...');
                const fieldTypeList = await AutopilotCore.fieldTypes.list(this.twilioClient, assistantSid),
                      builtInFieldTypesList = await AutopilotCore.builtInFieldTypes,
                      fieldTypeChoice = fieldTypeList.map(f => f.uniqueName),
                      builtInFieldTypesChoice = builtInFieldTypesList.map(b => b.uniqueName);
                
                let f_choices = builtInFieldTypesChoice, inquirer = this.inquirer;
                if(fieldTypeChoice.length)
                    f_choices = [...new Set(fieldTypeChoice), new inquirer.Separator(), ...new Set(builtInFieldTypesChoice)];

                spinner.stop();
                const answer = await this.inquirer.prompt(
                            [
                                {
                                    type: 'list',
                                    name: 'fieldTypeUniqueName',
                                    message: 'Choose your Field Type to create: ',
                                    choices: f_choices
                                }
                            ]
                        );

                fSid = answer.fieldTypeUniqueName;

            }
            spinner.start('Creating task field...\n')
            params.fieldType = fSid;

            const field = await AutopilotCore.fields.create(this.twilioClient, assistantSid, tSid, params);

            spinner.stop();
            console.log(`Task field with UniqueName: ${uniqueName} was created.`);
        }catch(err){

            spinner.stop();
            console.error(`ERROR: ${err.message}`);
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
        description : 'task sid'
    }),
    uniqueName : flags.string({
        description : 'field unique name',
        required : true
    }),
    fieldTypeSid : flags.string({
        description : 'The Field Type of the new field. Can be: a [Built-in FieldType](https://www.twilio.com/docs/assistant/api/built-in-field-types ), the `unique_name`, or the `sid` of a custom Field Type.'
    })
  },
  TwilioClientCommand.flags
)

module.exports = CreateAssistantTaskField;
