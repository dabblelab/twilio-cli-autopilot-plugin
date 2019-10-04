const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');

class DeleteAssistant extends TwilioClientCommand {

  async runCommand() {

    let { flags } = this.parse(DeleteAssistant);

    if (!flags.hasOwnProperty('assistantSid')) {
      console.log(`The '--assistantSid' argument is required`);
      return;
    }
    let spinner = ora().start('Deleting assistant...');

    try{

      const sid = flags.uniqueName || flags.assistantSid;

      //const recovery_schema = await AutopilotCore.exportAssistant(sid, this.twilioClient, true);
      const result = await AutopilotCore.deleteAssistant(sid, this.twilioClient);

      spinner.stop();
      console.log(`\nRemoved assistant with UniqueName: ${sid}`);
    }catch(err){

      spinner.stop();
    
      console.error(`ERROR: ${err}`);
    }
  }
}

DeleteAssistant.description = `Delete an assistant`;

DeleteAssistant.flags = Object.assign(
  {
    assistantSid : flags.string({
      char : 's',
      description : 'assistant sid',
      required : true
    }),
    uniqueName : flags.string({
      description : 'assistant uniqueName'
    })
  },
  TwilioClientCommand.flags
)

module.exports = DeleteAssistant
