const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      path = require('path'),
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');

const { handler } = require('../../lib/serverless/deploy'),
      { convertYargsOptionsToOclifFlags, normalizeFlags, createExternalCliOptions } = require('../../utils'),
      updateTaskURL = require('../../lib/serverless/updateTaskURL'),
      {options, describe} = require('../../lib/options/deploy');


class AssistantsDeploy extends TwilioClientCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);

    this.showHeaders = true;
  }

  async run() {
    await super.run();
    let { flags, args } = this.parse(AssistantsDeploy);
    flags = normalizeFlags(flags);
    const spinner = ora();

    try{

      const externalOptions = createExternalCliOptions(flags, this.twilioClient);
      let hanlder_response = {};

      if(flags.target === 'all' || flags.target === 'function'){

        const opts = Object.assign({}, flags, args);
        hanlder_response = await handler(opts, externalOptions);
      }

      const fullPath = path.resolve(process.cwd(), 'model', 'schema.json');
      if(flags.target === 'all'){
        await updateTaskURL(fullPath, hanlder_response.url);
      }

      if(flags.target === 'all' || flags.target === 'model'){

        spinner.start('deploying model...');
        if(await AutopilotCore.existAssistant(fullPath, this.twilioClient)){

          await AutopilotCore.updateAssistant(fullPath, this.twilioClient);
        }else{

          await AutopilotCore.createAssistant(fullPath, this.twilioClient);
        }

        spinner.text = 'Model successfully deployed'
        spinner.succeed();
      }
      
      return;
    }
    catch(err){

      spinner.stop()
    
      console.error(`ERROR: ${err}`)

    }
    
  }
}

AssistantsDeploy.description = describe;

AssistantsDeploy.flags = Object.assign(
  convertYargsOptionsToOclifFlags(options),
  { profile: TwilioClientCommand.flags.profile }
);

module.exports = AssistantsDeploy;
