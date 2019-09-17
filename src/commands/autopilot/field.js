const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      path = require('path');

class FieldAssistant extends TwilioClientCommand {

  async runCommand() {

    let { flags, args } = this.parse(FieldAssistant);

    if (!flags.hasOwnProperty('assistantSid')) {
      console.log(`The '--assistantSid' argument is required`)
      return
    }
    if (!flags.hasOwnProperty('field')) {
      console.log(`The '--field' argument is required`)
      return
    }
    if (!flags.hasOwnProperty('csv')) {
      console.log(`The '--csv' argument is required`)
      return
    }

    let spinner = ora().start('Adding field values...')

    try{

      const sid = flags.assistantSid,
            fieldUniqueName = flags.field,
            csvPath = flags.csv;

      const assistant = await AutopilotCore.bulkUploadFieldValues(sid, fieldUniqueName, csvPath, this.twilioClient);

      spinner.stop();   

      console.log(`Field values added to the assistant '${assistant.uniqueName}'`);
    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err}`)
    }
  }
}

FieldAssistant.description = `Bulk upload field values`;

FieldAssistant.flags = Object.assign(
  {
    assistantSid : flags.string({
      char : 's',
      description : 'assistant sid',
      required : true
    })
  },
  {
    field : flags.string({
      char : 'f',
      description : 'Field Type Sid/UniqueName',
      required : true
    })
  },
  {
    csv : flags.string({
      char : 'c',
      description : 'CSV File path',
      required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = FieldAssistant
