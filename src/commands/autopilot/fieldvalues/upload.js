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
    if (!flags.hasOwnProperty('fileName')) {
        console.log(`The '--fileName' argument is required`)
        return;
    }
    let spinner = await ora();

    try{

      const {assistantSid, fieldTypeSid, fileName} = flags;
      let fSid = fieldTypeSid;

      if(!fieldTypeSid){

        spinner.start(`Getting field type list...`)
        const fieldTypeList = await AutopilotCore.fieldTypes.list(this.twilioClient, assistantSid),
                fieldTypeChoice = fieldTypeList.map(f => f.uniqueName);

        spinner.stop();

        if(!fieldTypeList.length){
          console.log(`\nNo FieldTypes found!\nUse "twilio autopilot:fieldtypes:create" if you need to create a new field type.`);
          return;
        }
        const answer = await this.inquirer.prompt(
                    [
                        {
                          type: 'list',
                          name: 'fieldTypeUniqueName',
                          message: 'Choose your Field Type in which to upload: ',
                          choices: fieldTypeChoice
                        }
                    ]
                );

        fSid = answer.fieldTypeUniqueName;
    }

      spinner.start('Uploading FieldValues...');

      let fullPath = `${path.resolve()}/${fileName}`;
  
      await AutopilotCore.uploadFieldValues(this.twilioClient, assistantSid, fSid, fullPath);
  
      spinner.stop()   
  
      console.log(`FieldValues was uploaded in ${fSid}`);

    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err.message}`)
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
        description : 'field type SID'
    }),
    fileName : flags.string({
        description : 'a CSV file of field values (one on each row with synonyms in columns)',
        required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = FieldValuesUpload
