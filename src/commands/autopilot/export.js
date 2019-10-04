const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');

class ExportAssistants extends TwilioClientCommand {

  async runCommand() {
    let spinner = await ora();

    try{

      let { flags } = this.parse(ExportAssistants);
      let assistantSid = flags.uniqueName || flags.assistantSid || '',
          seletedAssistant = assistantSid;

      if(!assistantSid){

        spinner.start(`Getting assistant List...\n`);
        const fullData = await AutopilotCore.listAssistant(this.twilioClient);
        spinner.stop();

        if(fullData.length){

          const choices = await fullData.map(x => {return x.uniqueName});

          const answer = await this.inquirer.prompt([
              {
                type: 'list',
                name: 'assistantName',
                message: 'Choose your assistant: ',
                choices: choices
              }
            ]);
          
          seletedAssistant = answer.assistantName;
        }
        else{

          console.log('no assistants.');
          return;
        }
      }

      spinner.start(`Exporting assistant...`);
      const assistant = await AutopilotCore.exportAssistant(seletedAssistant, this.twilioClient);
      spinner.stop();
      console.log(`\nFile exported in ${assistant.filename}`);
    }catch(err){

      spinner.stop();
      console.error(`ERROR: ${err}`);
    }
  }
}

ExportAssistants.description = `Export an assistant`;

ExportAssistants.flags = Object.assign(
  {
    assistantSid : flags.string({
      description : 'assistant sid'
    }),
    uniqueName : flags.string({
      description : 'assistant uniqueName'
    })
  },
  TwilioClientCommand.flags
)

module.exports = ExportAssistants
