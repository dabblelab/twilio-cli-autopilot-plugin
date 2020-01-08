require('module-alias/register');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      path = require('path'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('@root/src/utils'),
      { options, describe } = require('@lib/options/samples/upload');

class TaskSamplesUpload extends TwilioClientCommand {

  async run() {
    await super.run();

    let { flags } = this.parse(TaskSamplesUpload);
    flags = normalizeFlags(flags);

    if (!flags.hasOwnProperty('assistantSid')) {
      console.log(`The '--assistant-sid' argument is required`)
      return;
    }

    if (!flags.hasOwnProperty('fileName')) {
        console.log(`The '--file-name' argument is required`)
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
                            message: 'Select the Task you want to train with these Samples: ',
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
  
      console.log(`Samples was uploaded in "${tSid}"`);

    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err.message}`)
    }
  }
}

TaskSamplesUpload.description = describe;

TaskSamplesUpload.flags = Object.assign(
  convertYargsOptionsToOclifFlags(options),
    { profile: TwilioClientCommand.flags.profile }
)

module.exports = TaskSamplesUpload
