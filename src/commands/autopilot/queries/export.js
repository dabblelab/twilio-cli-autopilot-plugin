const { TwilioClientCommand } = require("@twilio/cli-core").baseCommands,
  AutopilotCore = require("@dabblelab/autopilot-core"),
  ora = require("ora"),
  {
    convertYargsOptionsToOclifFlags,
    normalizeFlags,
  } = require("../../../utils"),
  { options, describe } = require("../../../lib/options/queries/export");

class ExportAssistantQueries extends TwilioClientCommand {
  async run() {
    await super.run();

    let { flags } = await this.parse(ExportAssistantQueries);
    flags = normalizeFlags(flags);

    if (!flags.hasOwnProperty("assistantSid")) {
      console.log(`The '--assistant-sid' is required`);
      return;
    }

    if (!flags.quantity) {
      console.log(`The '--quantity' is required`);
      return;
    }

    const spinner = ora().start("Exporting bot queries...\n");
    try {
      const { assistantSid, quantity } = flags;

      await AutopilotCore.exportAssistantQueries(
        this.twilioClient,
        assistantSid,
        quantity
      );
      spinner.stop();
      console.log(`Bot queries exported to "${assistantSid}"`);
    } catch (err) {
      spinner.stop();

      console.error(`ERROR: ${err.message}`);
    }
  }
}

ExportAssistantQueries.description = describe;

ExportAssistantQueries.flags = Object.assign(
  convertYargsOptionsToOclifFlags(options),
  { profile: TwilioClientCommand.flags.profile }
);

module.exports = ExportAssistantQueries;
