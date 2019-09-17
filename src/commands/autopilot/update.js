const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      path = require('path');

class UpdateAssistant extends TwilioClientCommand {

  async runCommand() {

    let { flags, args } = this.parse(UpdateAssistant);

    if (!flags.hasOwnProperty('schema')) {
      console.log(`The '--schema' argument is required`)
      return
    }
    let spinner = await ora();

    try{

      let schema = flags.schema;

      spinner.start('Updating assistant...');
      let fullPath = `${path.resolve()}/${schema}`
  
      const assistant = await AutopilotCore.updateAssistant(fullPath,this.twilioClient);
  
      spinner.stop()   
  
      console.log(`Assistant "${assistant.uniqueName}" was updated`)

    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err}`)
    }
  }
}

UpdateAssistant.description = `Update an assistant`;

UpdateAssistant.flags = Object.assign(
  {
    schema : flags.string({
      char : 's',
      description : 'schema path',
      required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = UpdateAssistant
