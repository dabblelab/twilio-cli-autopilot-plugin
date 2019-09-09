const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      autopilot = require('../../lib/twilio-assistant'),
      ora = require('ora'),
      path = require('path');

class DeleteAssistant extends TwilioClientCommand {

  async runCommand() {

    let { flags, args } = this.parse(DeleteAssistant);

    if (!flags.hasOwnProperty('assistantSid')) {
      console.log(`The '--assistantSid' argument is required`)
      return
    }
    let spinner = ora().start('Deleting assistant...')

    try{

      const sid = flags.assistantSid;

      //const recovery_schema = await autopilot.exportAssistant(sid, this.twilioClient, true);
      const result = await autopilot.deleteAssistantFully(sid,this.twilioClient)

      spinner.stop()
      console.log(`\nRemoved assistant with UniqueName: ${flags.assistantSid}`)
    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err}`)
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
    })
  },
  TwilioClientCommand.flags,
  TwilioClientCommand.accountSidFlag
)

module.exports = DeleteAssistant
