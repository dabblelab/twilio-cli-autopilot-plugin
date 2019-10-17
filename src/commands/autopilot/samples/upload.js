const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      path = require('path');

class TaskSamplesUpload extends TwilioClientCommand {

  async runCommand() {

    let { flags } = this.parse(TaskSamplesUpload);

    if (!flags.hasOwnProperty('assistantSid')) {
      console.log(`The '--assistantSid' argument is required`)
      return;
    }

    if (!flags.hasOwnProperty('fileName')) {
        console.log(`The '--fileName' argument is required`)
        return;
    }
    let spinner = await ora();

    try{

      const {assistantSid, taskSid, fileName} = flags;
      let tSid = taskSid;

      if(!taskSid){

        spinner.start(`Getting task list...`)
        const taskList = await AutopilotCore.tasks.list(this.twilioClient, assistantSid),
                taskChoice = taskList.map(t => t.uniqueName);

        spinner.stop();
        if(!taskList.length){
          console.log(`\n No Task in which to upload samples \n Use "twilio autopilot:tasks:create" if you need to create a new task.`);
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

      spinner.start('Uploading task samples...');

      let fullPath = `${path.resolve()}/${fileName}`;
  
      const task = await AutopilotCore.uploadTaskSamples(this.twilioClient, assistantSid, tSid, fullPath);
  
      spinner.stop()   
  
      console.log(`Samples was uploaded in ${taskSid}`);

    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err.message}`)
    }
  }
}

TaskSamplesUpload.description = `Upload task samples`;

TaskSamplesUpload.flags = Object.assign(
  {
    assistantSid : flags.string({
        char : 's',
        description : 'assistant that owns the task',
        required : true
    }),
    taskSid : flags.string({
        description : 'task sid'
    }),
    fileName : flags.string({
        description : 'a CSV file of samples',
        required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = TaskSamplesUpload
