const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      autopilot = require('../../lib/twilio-assistant'),
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
        
  
        clonedAssistant = await autopilot.clone(url, false, this.inquirer);
  
        schema = path.join(clonedAssistant, 'schema.json');
  
      }
      spinner.start('Creating assistant...');
      let fullPath = `${path.resolve()}/${schema}`
  
      const assistant = await autopilot.createAssistantFully(fullPath,this.twilioClient)
  
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
  TwilioClientCommand.flags,
  TwilioClientCommand.accountSidFlag
)

module.exports = CreateAssistant
