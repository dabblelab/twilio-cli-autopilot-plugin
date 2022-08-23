const { TwilioClientCommand } = require("@twilio/cli-core").baseCommands,
  AutopilotCore = require("@dabblelab/autopilot-core"),
  ora = require("ora"),
  {
    convertYargsOptionsToOclifFlags,
    normalizeFlags,
  } = require("../../../utils"),
  { options, describe } = require("../../../lib/options/tasks/create");

class CreateAssistantTask extends TwilioClientCommand {
  async run() {
    await super.run();

    let { flags } = await this.parse(CreateAssistantTask);
    flags = normalizeFlags(flags);

    if (!flags.hasOwnProperty("assistantSid")) {
      console.log(`The '--assistant-sid' is required`);
      return;
    }

    if (!flags.uniqueName) {
      console.log(`The '--unique-name' is required`);
      return;
    }

    const spinner = ora().start("Creating bot task...\n");
    try {
      const { assistantSid, uniqueName, friendlyName } = flags,
        params = {
          uniqueName: uniqueName,
          friendlyName: friendlyName || "",
        };

      const task = await AutopilotCore.tasks.create(
        this.twilioClient,
        assistantSid,
        params
      );
      spinner.stop();
      console.log(`Task "${task.uniqueName}" was created`);
    } catch (err) {
      spinner.stop();

      console.error(`ERROR: ${err.message}`);
    }
  }
}

CreateAssistantTask.description = describe;

CreateAssistantTask.flags = Object.assign(
  convertYargsOptionsToOclifFlags(options),
  { profile: TwilioClientCommand.flags.profile }
);

module.exports = CreateAssistantTask;
