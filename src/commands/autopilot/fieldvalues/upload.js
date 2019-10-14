const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      path = require('path');

class FieldValuesUpload extends TwilioClientCommand {

  async runCommand() {

    let { flags } = this.parse(FieldValuesUpload);

    if (!flags.hasOwnProperty('assistantSid')) {
      console.log(`The '--assistantSid' argument is required`)
      return;
    }
    if (!flags.hasOwnProperty('fieldTypeSid')) {
        console.log(`The '--fieldTypeSid' argument is required`)
        return;
    }
    if (!flags.hasOwnProperty('fileName')) {
        console.log(`The '--fileName' argument is required`)
        return;
    }
    let spinner = await ora();

    try{

      const {assistantSid, fieldTypeSid, fileName} = flags;

      spinner.start('Uploading FieldValues...');

      let fullPath = `${path.resolve()}/${fileName}`;
  
      await AutopilotCore.uploadFieldValues(this.twilioClient, assistantSid, fieldTypeSid, fullPath);
  
      spinner.stop()   
  
      console.log(`FieldValues was uploaded in ${fieldTypeSid}`);

    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err}`)
    }
  }
}

FieldValuesUpload.description = `Upload FieldValues`;

FieldValuesUpload.flags = Object.assign(
  {
    assistantSid : flags.string({
        char : 's',
        description : 'assistant that owns the task',
        required : true
    }),
    fieldTypeSid : flags.string({
        description : 'field type SID',
        required : true
    }),
    fileName : flags.string({
        description : 'a CSV file of field values (one on each row with synonyms in columns)',
        required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = FieldValuesUpload
