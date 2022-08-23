const { TwilioClientCommand } = require("@twilio/cli-core").baseCommands,
  AutopilotCore = require("@dabblelab/autopilot-core"),
  ora = require("ora"),
  { convertYargsOptionsToOclifFlags, normalizeFlags } = require("../../utils"),
  { options, describe } = require("../../lib/options/list");

class ListAssistants extends TwilioClientCommand {
  async run() {
    await super.run();

    const spinner = ora().start("Getting assistants...\n");
    try {
      let { flags } = await this.parse(ListAssistants);
      flags = normalizeFlags(flags);

      const fullData = await AutopilotCore.listAssistant(this.twilioClient);

      spinner.stop();
      this.output(fullData, flags.properties);
    } catch (err) {
      spinner.stop();
      console.error(`ERROR: ${err}`);
    }
  }
}

ListAssistants.description = describe;

ListAssistants.flags = Object.assign(convertYargsOptionsToOclifFlags(options), {
  profile: TwilioClientCommand.flags.profile,
});

module.exports = ListAssistants;
