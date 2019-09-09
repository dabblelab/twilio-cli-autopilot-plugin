const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      autopilot = require('../../lib/twilio-assistant'),
      prettyJSONStringify = require('pretty-json-stringify'),
      ora = require('ora'),
      path = require('path');

class SimulateAssistant extends TwilioClientCommand {

  async runCommand() {

    let { flags, args } = this.parse(SimulateAssistant);

    if (!flags.hasOwnProperty('assistantSid')) {
      console.log(`The '--assistantSid' argument is required`)
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

      //const recovery_schema = await autopilot.exportAssistant(sid, this.twilioClient, true);
      const channelResponse = await autopilot.customChannel(sid, channel, text, this.twilioClient);

      spinner.stop();   

      console.log(`Channel response\n`);
      console.log(prettyJSONStringify(channelResponse));
    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err}`)
    }
  }
}

SimulateAssistant.description = `Simulate an assistant`;

SimulateAssistant.flags = Object.assign(
  {
    assistantSid : flags.string({
      char : 's',
      description : 'assistant sid',
      required : true
    })
  },
  {
    text : flags.string({
      char : 't',
      description : 'User text input',
      required : true
    })
  },
  TwilioClientCommand.flags,
  TwilioClientCommand.accountSidFlag
)

module.exports = SimulateAssistant
