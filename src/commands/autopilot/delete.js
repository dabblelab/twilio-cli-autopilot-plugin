const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('../../utils'),
      { options, describe } = require('../../lib/options/delete');

class DeleteAssistant extends TwilioClientCommand {

  async runCommand() {

    let { flags } = this.parse(DeleteAssistant);

    flags = normalizeFlags(flags);

    if (!flags.hasOwnProperty('assistantSid')) {
      console.log(`The '--assistant-sid' argument is required`);
      return;
    }
    let spinner = ora().start('Deleting assistant...');

    try{

      const sid = flags.uniqueName || flags.assistantSid;

      //const recovery_schema = await AutopilotCore.exportAssistant(sid, this.twilioClient, true);
      const result = await AutopilotCore.deleteAssistant(sid, this.twilioClient);

      spinner.stop();
      console.log(`Assistant "${sid}" was deleted`);
    }catch(err){

      spinner.stop();
    
      console.error(`ERROR: ${err}`);
    }
  }
}

DeleteAssistant.description = describe;

DeleteAssistant.flags = Object.assign(
  convertYargsOptionsToOclifFlags(options),
  { profile: TwilioClientCommand.flags.profile }
)

module.exports = DeleteAssistant
