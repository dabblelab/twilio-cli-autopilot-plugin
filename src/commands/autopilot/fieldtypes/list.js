const { TwilioClientCommand } = require("@twilio/cli-core").baseCommands,
  AutopilotCore = require("@dabblelab/autopilot-core"),
  ora = require("ora"),
  {
    convertYargsOptionsToOclifFlags,
    normalizeFlags,
  } = require("../../../utils"),
  { options, describe } = require("../../../lib/options/fieldtypes/list");

class ListAssistantFieldTypes extends TwilioClientCommand {
  async run() {
    await super.run();

    let { flags } = await this.parse(ListAssistantFieldTypes);
    flags = normalizeFlags(flags);

    if (!flags.hasOwnProperty("assistantSid")) {
      console.log(`The '--assistant-sid' is required`);
      return;
    }

    const spinner = ora().start("Getting Bot FieldTypes...\n");
    try {
      const { assistantSid } = flags;
      const fullData = await AutopilotCore.fieldTypes.list(
        this.twilioClient,
        assistantSid
      );
      spinner.stop();
      this.output(fullData, this.flags.properties);
    } catch (err) {
      spinner.stop();

      console.error(`ERROR: ${err.message}`);
    }
  }
}

ListAssistantFieldTypes.description = describe;

ListAssistantFieldTypes.flags = Object.assign(
  convertYargsOptionsToOclifFlags(options),
  { profile: TwilioClientCommand.flags.profile }
);

module.exports = ListAssistantFieldTypes;
