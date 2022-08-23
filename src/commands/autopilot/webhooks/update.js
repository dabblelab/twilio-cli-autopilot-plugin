const { TwilioClientCommand } = require("@twilio/cli-core").baseCommands,
  AutopilotCore = require("@dabblelab/autopilot-core"),
  ora = require("ora"),
  {
    convertYargsOptionsToOclifFlags,
    normalizeFlags,
  } = require("../../../utils"),
  { options, describe } = require("../../../lib/options/webhooks/update");

class UpdateAssistantWebhook extends TwilioClientCommand {
  async run() {
    await super.run();

    let { flags } = await this.parse(UpdateAssistantWebhook);
    flags = normalizeFlags(flags);

    const eventTypes = {
      ondialoguestart: "onDialogueStart",
      ondialogueend: "onDialogueEnd",
      ondialoguetaskstart: "onDialogueTaskStart",
      onactionsfetch: "onActionsFetch",
      oncollectattempt: "onCollectAttempt",
    };
    const {
      assistantSid,
      webhookSid,
      webhookUniqueName,
      events,
      webhookURL,
      method,
    } = flags;

    if (!flags.hasOwnProperty("assistantSid")) {
      console.log(`The '--assistantSid' is required`);
      return;
    }

    const spinner = ora();
    try {
      let mEvents = [],
        wSid = webhookSid;

      if (!webhookSid) {
        spinner.start(`Getting webhook list...`);
        const webhookList = await AutopilotCore.webhooks.list(
            this.twilioClient,
            assistantSid
          ),
          webhookChoice = webhookList.map((t) => t.uniqueName);

        spinner.stop();

        if (!webhookList.length) {
          console.log(
            `\n No webhook found to update \n Use "twilio autopilot:webhooks:create" if you need to create a new webhook.`
          );
          return;
        }
        const answer = await this.inquirer.prompt([
          {
            type: "list",
            name: "webhookUniqueName",
            message: "Select the webhook you want to update: ",
            choices: webhookChoice,
          },
        ]);

        wSid = answer.webhookUniqueName;
      }
      if (events) {
        const eventList = [...new Set(events.toLowerCase().trim().split(" "))];
        if (eventList.length) {
          mEvents = eventList.filter((l) =>
            eventTypes.hasOwnProperty(l.toLowerCase())
          );
          if (!mEvents.length) {
            console.log(`The '--events' paramater can contain one or all of the following values (space separtated).
                        onDialogueStart
                        onDialogueEnd
                        onDialogueTaskStart
                        onActionsFetch
                        onCollectAttempt`);
            return;
          }
        }
      }

      spinner.start("Updating assistant webhooks...\n");
      let params = {};

      if (webhookUniqueName) params["uniqueName"] = webhookUniqueName;

      if (mEvents.length) params["events"] = mEvents.join(" ");

      if (webhookURL) params["webhookUrl"] = webhookURL;

      if (method) params["webhookMethod"] = method;

      let webhook = {};

      if (Object.keys(params).length)
        webhook = await AutopilotCore.webhooks.update(
          this.twilioClient,
          assistantSid,
          wSid,
          params
        );

      spinner.stop();
      console.log(`Webhooks "${wSid}" was updated`);
    } catch (err) {
      spinner.stop();

      console.error(`ERROR: ${err}`);
    }
  }
}

UpdateAssistantWebhook.description = describe;

UpdateAssistantWebhook.flags = Object.assign(
  convertYargsOptionsToOclifFlags(options),
  { profile: TwilioClientCommand.flags.profile }
);

module.exports = UpdateAssistantWebhook;
