const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      path = require('path'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('../../utils'),
      { options, describe } = require('../../lib/options/create');

class CreateAssistant extends TwilioClientCommand {

  async run() {
    await super.run();
    let spinner = await ora();

    try{

      let { flags } = this.parse(CreateAssistant);

      flags = normalizeFlags(flags);

      let schema = flags.schema,
          clonedAssistant = '';

      if(schema == 'templates'){
        //TODO: the templates.json url should not be hard coded
        let url = 'https://raw.githubusercontent.com/twilio/autopilot-templates/master/Assistants/templates.json';
        
        clonedAssistant = await AutopilotCore.cloneTemplate(url, false);
  
        schema = path.join(clonedAssistant, 'schema.json');
  
      }
      spinner.start('Creating bot...');
      let fullPath = `${path.resolve()}/${schema}`
  
      const assistant = await AutopilotCore.createAssistant(fullPath, this.twilioClient);
  
      spinner.stop()   
  
      console.log(`Bot "${assistant.uniqueName}" was created`);
    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err}`)
    }
  }
}

CreateAssistant.description = describe;

CreateAssistant.flags = Object.assign(
  convertYargsOptionsToOclifFlags(options),
  { profile: TwilioClientCommand.flags.profile }
)

module.exports = CreateAssistant
