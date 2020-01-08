const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('../../../utils'),
      { options, describe } = require('../../../lib/options/fields/list');
      
class ListAssistantTaskFields extends TwilioClientCommand {
  
    async run() {
        await super.run();

        let { flags } = this.parse(ListAssistantTaskFields);
        flags = normalizeFlags(flags);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistant-sid' is required`);
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
                                    message: 'Choose the Task your Fields belong to: ',
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

ListAssistantTaskFields.description = describe;

ListAssistantTaskFields.flags = Object.assign(
    convertYargsOptionsToOclifFlags(options),
    { profile: TwilioClientCommand.flags.profile }
)

module.exports = ListAssistantTaskFields
