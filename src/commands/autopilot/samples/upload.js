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
    if (!flags.hasOwnProperty('taskSid')) {
        console.log(`The '--taskSid' argument is required`)
        return;
    }
    if (!flags.hasOwnProperty('fileName')) {
        console.log(`The '--fileName' argument is required`)
        return;
    }
    let spinner = await ora();

    try{

      let assistantSid = flags.assistantSid,
          taskSid = flags.taskSid,
          fileName = flags.fileName;

      spinner.start('Uploading task samples...');

      let fullPath = `${path.resolve()}/${fileName}`;
  
      const task = await AutopilotCore.uploadTaskSamples(this.twilioClient, assistantSid, taskSid, fullPath);
  
      spinner.stop()   
  
      console.log(`Samples was uploaded in ${taskSid}`);

    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err}`)
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
        description : 'task sid',
        required : true
    }),
    fileName : flags.string({
        description : 'a CSV file of samples',
        required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = TaskSamplesUpload
