const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      autopilot = require('../../lib/twilio-assistant'),
      ora = require('ora');
      
class ListAssistants extends TwilioClientCommand {
  
    async runCommand() {
      const spinner = ora().start('Getting assistants...\n');
      try{
        const fullData = await autopilot.listAssistants(this.twilioClient);
        spinner.stop();
        this.output(fullData, this.flags.properties);
      }catch(err){

        spinner.stop()
        
        console.error(`ERROR: ${err}`)
      }
    }
  
}

ListAssistants.description = `List all autopilot assistant`;

ListAssistants.flags = Object.assign(
  {
    properties: flags.string({
      default: 'sid, uniqueName, friendlyName',
      description:
        'The Autopilot Assistant List.'
    })
  },
  TwilioClientCommand.flags,
  TwilioClientCommand.accountSidFlag
)

module.exports = ListAssistants