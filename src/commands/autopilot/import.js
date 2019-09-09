const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      autopilot = require('../../lib/twilio-assistant'),
      ora = require('ora'),
      path = require('path');

class ImportAssistant extends TwilioClientCommand {

  async runCommand() {

    let spinner = ora();

    try{

      let { flags, args } = this.parse(ImportAssistant),
          filename = ``,
          assistant = {};

      if(args.type === 'alexa'){

        if (!flags.hasOwnProperty('model')) {
          console.log(`The '--model' argument is required`);
          return
        }

        const model = flags.model,
              redirectURL = flags.redirectURL,
              modelFullPath = `${path.resolve()}/${model}`

        spinner.start('Importing assistant...');

        filename = await autopilot.importAlexaAssistant(modelFullPath, redirectURL);
      }
      else{

        if (!flags.hasOwnProperty('dfbackup')) {
          console.log(`The '--dfbackup' argument is required`)
          return
        }
        if (!flags.hasOwnProperty('dfagent')) {
          console.log(`The '--dfagent' argument is required`)
          return
        }

        const dfbackup = flags.dfbackup,
              name = flags.dfagent,
              dfFullPath = `${path.resolve()}/${dfbackup}`;

        spinner.start('Importing assistant...');

        filename = await autopilot.importAssistant(dfFullPath, name);
      }

      const fullPath = path.resolve(process.cwd(),filename);

      if(await autopilot.existAssistantCheck(fullPath, this.twilioClient)){

        assistant = await autopilot.updateAssistant(fullPath, this.twilioClient);
      }else{

        assistant = await autopilot.createAssistantFully(fullPath, this.twilioClient);
      }

      spinner.stop()
      console.log(`Assistant "${assistant.uniqueName}" was imported`);
    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err}`)
    }
  }
}

ImportAssistant.description = `Import a DialogFlow Agent/Alexa Interaction Model
-> twilio autopilot:import dialogflow --dfbackup <dialogflow-backup-zip-file> --dfagent <dialogflow-agent-name>
-> twilio autopilot:import alexa --model <alexa-interaction-model-file> [--redirectURL <alexa-back-end-hanlder-url>]`;

ImportAssistant.args = [
  {
    name: 'type',
    required: false,
    description: 'Type of import DialogFlow/Alexa',
    default: 'dialogflow',
    options: ['dialogflow', 'alexa']
  },
];

ImportAssistant.flags = Object.assign(
  {
    dfbackup : flags.string({
      char : 'b',
      description : 'Dialogflow Agent Backup Zip File Local Path',
      multiple: false,
      exclusive: ['model', 'redirectURL']
    })
  },
  {
    dfagent : flags.string({
      char : 'a',
      description : 'Dialogflow Agent Name',
      multiple: false,
      exclusive: ['model', 'redirectURL']
    })
  },
  {
    model : flags.string({
      char : 'm',
      description : 'Alexa Interaction Model File Path',
      multiple: false,
      exclusive: ['dfbackup', 'dfagent']
    })
  },
  {
    redirectURL : flags.string({
      char : 'r',
      description : 'Alexa Back-End Hanlder URL to send back the response',
      multiple: false,
      exclusive: ['dfbackup', 'dfagent'],
      default : 'https://inquisitive-stretch-2083.twil.io/generic'
    })
  },
  TwilioClientCommand.flags,
  TwilioClientCommand.accountSidFlag
)

module.exports = ImportAssistant
