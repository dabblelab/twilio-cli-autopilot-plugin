require('module-alias/register');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      path = require('path'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('@root/src/utils'),
      { options, describe } = require('@lib/options/fieldvalues/upload');

class FieldValuesUpload extends TwilioClientCommand {

  async run() {
    await super.run();

    let { flags } = this.parse(FieldValuesUpload);
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
                          message: 'Select Field Type in which to upload: ',
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
  
      console.log(`FieldValues was uploaded in "${fSid}"`);

    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err.message}`)
    }
  }
}

FieldValuesUpload.description = describe;

FieldValuesUpload.flags = Object.assign(
  convertYargsOptionsToOclifFlags(options),
  { profile: TwilioClientCommand.flags.profile }
)

module.exports = FieldValuesUpload
