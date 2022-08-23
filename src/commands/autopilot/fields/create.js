const { TwilioClientCommand } = require("@twilio/cli-core").baseCommands,
  AutopilotCore = require("@dabblelab/autopilot-core"),
  ora = require("ora"),
  {
    convertYargsOptionsToOclifFlags,
    normalizeFlags,
  } = require("../../../utils"),
  { options, describe } = require("../../../lib/options/fields/create");

class CreateAssistantTaskField extends TwilioClientCommand {
  async run() {
    await super.run();

    let { flags } = await this.parse(CreateAssistantTaskField);
    flags = normalizeFlags(flags);

    if (!flags.hasOwnProperty("assistantSid")) {
      console.log(`The '--assistant-sid' is required`);
      return;
    }

    if (!flags.uniqueName) {
      console.log(`The '--unique-name' is required`);
      return;
    }

    const spinner = ora();
    try {
      const { assistantSid, taskSid, fieldTypeSid, uniqueName } = flags,
        params = {
          uniqueName: uniqueName,
          fieldType: fieldTypeSid,
        };
      let tSid = taskSid,
        fSid = fieldTypeSid;

      if (!taskSid) {
        spinner.start(`Getting task list...`);
        const taskList = await AutopilotCore.tasks.list(
            this.twilioClient,
            assistantSid
          ),
          taskChoice = taskList.map((t) => t.uniqueName);

        spinner.stop();
        if (!taskList.length) {
          console.log(
            `\n No Task \n Use "twilio autopilot:tasks:create" if you need to create a new task.`
          );
          return;
        }
        const answer = await this.inquirer.prompt([
          {
            type: "list",
            name: "taskUniqueName",
            message: "Choose a Task for the new Field: ",
            choices: taskChoice,
          },
        ]);

        tSid = answer.taskUniqueName;
      }

      if (!fieldTypeSid) {
        console.log(
          `\nUse 'twilio autopilot:fieldtypes:create' if you need to create a new field type.\n`
        );
        spinner.start("Getting Field Types...");
        const fieldTypeList = await AutopilotCore.fieldTypes.list(
            this.twilioClient,
            assistantSid
          ),
          builtInFieldTypesList = await AutopilotCore.builtInFieldTypes,
          fieldTypeChoice = fieldTypeList.map((f) => f.uniqueName),
          builtInFieldTypesChoice = builtInFieldTypesList.map(
            (b) => b.uniqueName
          );

        let f_choices = builtInFieldTypesChoice,
          inquirer = this.inquirer;
        if (fieldTypeChoice.length)
          f_choices = [
            ...new Set(fieldTypeChoice),
            new inquirer.Separator(),
            ...new Set(builtInFieldTypesChoice),
          ];

        spinner.stop();
        const answer = await this.inquirer.prompt([
          {
            type: "list",
            name: "fieldTypeUniqueName",
            message: "Choose a Field Type for the new Field: ",
            choices: f_choices,
          },
        ]);

        fSid = answer.fieldTypeUniqueName;
      }
      spinner.start("Creating task field...\n");
      params.fieldType = fSid;

      const field = await AutopilotCore.fields.create(
        this.twilioClient,
        assistantSid,
        tSid,
        params
      );

      spinner.stop();
      console.log(`Task field "${uniqueName}" was created`);
    } catch (err) {
      spinner.stop();
      console.error(`ERROR: ${err.message}`);
    }
  }
}

CreateAssistantTaskField.description = describe;

CreateAssistantTaskField.flags = Object.assign(
  convertYargsOptionsToOclifFlags(options),
  { profile: TwilioClientCommand.flags.profile }
);

module.exports = CreateAssistantTaskField;
