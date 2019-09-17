const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      path = require('path');

class CreateAssistant extends TwilioClientCommand {

  async runCommand() {
    let spinner = await ora();

    try{

      let { flags, args } = this.parse(CreateAssistant),
            schema = flags.schema,
            clonedAssistant = '';

      if(schema == 'templates'){

        let url = 'https://raw.githubusercontent.com/twilio/autopilot-templates/master/Assistants/templates.json';
        
        clonedAssistant = await AutopilotCore.cloneTemplate(url, false);
  
        schema = path.join(clonedAssistant, 'schema.json');
  
      }
      spinner.start('Creating assistant...');
      let fullPath = `${path.resolve()}/${schema}`
  
      const assistant = await AutopilotCore.createAssistant(fullPath,this.twilioClient);
  
      spinner.stop()   
  
      console.log(`Assistant "${assistant.uniqueName}" was created`);
    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err}`)
    }
  }
}

CreateAssistant.description = `Create an assistant`;

CreateAssistant.flags = Object.assign(
  {
    schema : flags.string({
      char : 's',
      description : 'schema path',
      default : "templates",
      required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = CreateAssistant
