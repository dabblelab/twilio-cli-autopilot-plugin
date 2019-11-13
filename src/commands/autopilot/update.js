const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      path = require('path'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('../../utils'),
      { options, describe } = require('../../lib/options/update');

class UpdateAssistant extends TwilioClientCommand {

  async runCommand() {

    let { flags } = this.parse(UpdateAssistant);
    flags = normalizeFlags(flags);

    if (!flags.hasOwnProperty('schema')) {
      console.log(`The '--schema' argument is required`)
      return
    }
    let spinner = await ora();

    try{

      let schema = flags.schema;

      spinner.start('Updating assistant...');
      let fullPath = `${path.resolve()}/${schema}`,
          assistantUniqueName = flags.uniqueName || false;
  
      const assistant = await AutopilotCore.updateAssistant(fullPath, this.twilioClient, assistantUniqueName);
  
      spinner.stop()   
  
      console.log(`Assistant "${assistant.uniqueName}" was updated`)

    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err}`)
    }
  }
}

UpdateAssistant.description = describe;

UpdateAssistant.flags = Object.assign(
  convertYargsOptionsToOclifFlags(options),
  { profile: TwilioClientCommand.flags.profile }
)

module.exports = UpdateAssistant
