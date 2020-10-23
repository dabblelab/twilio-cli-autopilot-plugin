const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('../../utils'),
      { options, describe } = require('../../lib/options/export');

class ExportAssistants extends TwilioClientCommand {

  async run() {
    await super.run();
    let spinner = await ora();

    try{

      let { flags } = this.parse(ExportAssistants);
      flags = normalizeFlags(flags);

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
                message: 'Choose your bot: ',
                choices: choices
              }
            ]);
          
          seletedAssistant = answer.assistantName;
        }
        else{

          console.log('no bots.');
          return;
        }
      }

      spinner.start(`Exporting bot...`);
      const assistant = await AutopilotCore.exportAssistant(seletedAssistant, this.twilioClient);
      spinner.stop();
      console.log(`Bot schema file exported to "${assistant.filename}"`);
    }catch(err){

      spinner.stop();
      console.error(`ERROR: ${err}`);
    }
  }
}

ExportAssistants.description = describe;

ExportAssistants.flags = Object.assign(
  convertYargsOptionsToOclifFlags(options),
  { profile: TwilioClientCommand.flags.profile }
)

module.exports = ExportAssistants
