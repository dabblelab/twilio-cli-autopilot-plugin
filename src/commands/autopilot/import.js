const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora'),
      path = require('path'),
      { convertYargsOptionsToOclifFlags, normalizeFlags } = require('../../utils'),
      { options, describe } = require('../../lib/options/import');

class ImportAssistant extends TwilioClientCommand {

  async runCommand() {

    let spinner = ora();

    try{

      let { flags, args } = this.parse(ImportAssistant);
      flags = normalizeFlags(flags);

      let filename = ``,
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

        filename = await AutopilotCore.importAlexaModel(modelFullPath, redirectURL);
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

        filename = await AutopilotCore.importDialogFlowAgent(dfFullPath, name);
      }

      const fullPath = path.resolve(process.cwd(),filename);

      if(await AutopilotCore.existAssistant(fullPath, this.twilioClient)){

        assistant = await AutopilotCore.updateAssistant(fullPath, this.twilioClient);
      }else{

        assistant = await AutopilotCore.createAssistant(fullPath, this.twilioClient);
      }

      spinner.stop()
      console.log(`Assistant "${assistant.uniqueName}" was imported`);
    }catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err}`)
    }
  }
}

ImportAssistant.description = describe;

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
  convertYargsOptionsToOclifFlags(options),
  { profile: TwilioClientCommand.flags.profile }
)

module.exports = ImportAssistant
