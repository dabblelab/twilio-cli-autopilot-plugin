const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      autopilot = require('../../lib/twilio-assistant'),
      ora = require('ora');

class ExportAssistants extends TwilioClientCommand {

  async runCommand() {
    let spinner = await ora().start(`Getting assistant List...\n`);

    try{

      const fullData = await autopilot.listAssistants(this.twilioClient);
      if(fullData.length){

        const choices = await fullData.map(x => {return x.uniqueName});
        spinner.stop();

        this.inquirer.prompt([
          {
            type: 'list',
            name: 'assistantName',
            message: 'Choose your assistant: ',
            choices: choices
          }
        ]).then(async (answer) => {
          
          let seletedAssistant = answer.assistantName;

          spinner = ora().start(`Exporting assistant...`);
          const assistant = await autopilot.exportAssistant(seletedAssistant,this.twilioClient);
          await spinner.stop();
          console.log(`\nFile exported in ${assistant.filename}`);
            
        })
      }else{

        spinner.stop()
        console.log('no assistants.');
      }
    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err}`)
    }
  }
}

ExportAssistants.description = `Export an assistant`;

ExportAssistants.flags = Object.assign(
  TwilioClientCommand.flags,
  TwilioClientCommand.accountSidFlag
)

module.exports = ExportAssistants
