require('module-alias/register');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      prettyJSONStringify = require('pretty-json-stringify'),
      ora = require('ora'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('@root/src/utils'),
      { options, describe } = require('@lib/options/simulate');

class SimulateAssistant extends TwilioClientCommand {

  async run() {
    await super.run();

    let { flags } = this.parse(SimulateAssistant);
    flags = normalizeFlags(flags);

    if (!flags.hasOwnProperty('assistantSid')) {
      console.log(`The '--assistant-sid' argument is required`)
      return
    }
    if (!flags.hasOwnProperty('text')) {
      console.log(`The '--text' argument is required`)
      return
    }
    let spinner = ora().start('Sending text to channel...')

    try{

      const sid = flags.assistantSid,
            text = flags.text,
            channel = 'cli';

      const channelResponse = await AutopilotCore.customChannel(sid, channel, text, this.twilioClient);

      spinner.stop();   

      console.log(`Channel response\n`);
      console.log(prettyJSONStringify(channelResponse));
    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err}`)
    }
  }
}

SimulateAssistant.description = describe;

SimulateAssistant.flags = Object.assign(
  convertYargsOptionsToOclifFlags(options),
  { profile: TwilioClientCommand.flags.profile }
)

module.exports = SimulateAssistant
