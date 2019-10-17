const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class ListAssistantTaskFields extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(ListAssistantTaskFields);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }

        const spinner = ora()
        try{

            const {assistantSid, taskSid} = flags;
            let tSid = taskSid;

            if(!taskSid){

                spinner.start(`Getting task list...`)
                const taskList = await AutopilotCore.tasks.list(this.twilioClient, assistantSid),
                        taskChoice = taskList.map(t => t.uniqueName);

                spinner.stop();
                if(!taskList.length){
                    console.log(`\n No Task in which to list fields \n Use "twilio autopilot:tasks:create" if you need to create a new task.`);
                    return;
                }
                const answer = await this.inquirer.prompt(
                            [
                                {
                                    type: 'list',
                                    name: 'taskUniqueName',
                                    message: 'Choose your task in which to list: ',
                                    choices: taskChoice
                                }
                            ]
                        );

                tSid = answer.taskUniqueName;
            }

            spinner.start('Getting task fields...\n');
            const fullData = await AutopilotCore.fields.list(this.twilioClient, assistantSid, tSid);
            spinner.stop();
            this.output(fullData, this.flags.properties);
        }catch(err){

            spinner.stop()
            
            console.error(`ERROR: ${err.message}`)
        }
    }
  
}

ListAssistantTaskFields.description = `List all fields of a task`;

ListAssistantTaskFields.flags = Object.assign(
  {
    properties: flags.string({
      default: 'sid, uniqueName, fieldType',
      description:
        'The Autopilot Assistant Task List.'
    }),
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

module.exports = ListAssistantTaskFields
