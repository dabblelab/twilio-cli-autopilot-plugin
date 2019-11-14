Twilio Autopilot Plugin for the Twilio CLI
================

A plugin for the [Twilio CLI](https://github.com/twilio/twilio-cli) that merges and extends functionality from the [Autopilot CLI](https://github.com/dabblelab/twilio-cli-autopilot-plugin).  

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@dabblelab/plugin-autopilot.svg)](https://npmjs.org/package/@dabblelab/plugin-autopilot)
[![Downloads/week](https://img.shields.io/npm/dw/@dabblelab/plugin-autopilot.svg)](https://npmjs.org/package/@dabblelab/plugin-autopilot)
[![License](https://img.shields.io/npm/l/@dabblelab/plugin-autopilot.svg)](https://img.shields.io/github/license/dabblelab/twilio-cli-autopilot-plugin)

<!-- toc -->
* [Requirements](#requirements)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Requirements

## Install the Twilio CLI

Via `npm` or `yarn`:

```sh-session
$ npm install -g twilio-cli
$ yarn global add twilio-cli
```

Via `homebrew`:

```sh-session
$ brew tap twilio/brew && brew install twilio
```

# Usage

```sh-session
$ twilio plugins:install @dabblelab/plugin-autopilot
$ twilio --help autopilot
USAGE
  $ twilio autopilot
...
```

# Commands

<!-- commands -->

_Assistants_

* [`twilio autopilot:create`](#twilio-autopilotcreate)
* [`twilio autopilot:delete`](#twilio-autopilotdelete)
* [`twilio autopilot:export`](#twilio-autopilotexport)
* [`twilio autopilot:list`](#twilio-autopilotlist)
* [`twilio autopilot:update`](#twilio-autopilotupdate)

_Fields and Field Types

* [`twilio autopilot:fields:create`](#twilio-autopilotfieldscreate)
* [`twilio autopilot:fields:delete`](#twilio-autopilotfieldsdelete)
* [`twilio autopilot:fields:list`](#twilio-autopilotfieldslist)
* [`twilio autopilot:fieldtypes:create`](#twilio-autopilotfieldtypescreate)
* [`twilio autopilot:fieldtypes:list`](#twilio-autopilotfieldtypeslist)
* [`twilio autopilot:fieldtypes:update`](#twilio-autopilotfieldtypesupdate)
* [`twilio autopilot:fieldvalues:upload`](#twilio-autopilotfieldvaluesupload)


_Tasks and Samples_

* [`twilio autopilot:tasks:create`](#twilio-autopilottaskscreate)
* [`twilio autopilot:tasks:delete`](#twilio-autopilottasksdelete)
* [`twilio autopilot:tasks:list`](#twilio-autopilottaskslist)
* [`twilio autopilot:tasks:update`](#twilio-autopilottasksupdate)
* [`twilio autopilot:samples:upload`](#twilio-autopilotsamplesupload)


_Import bots from other platforms_

* [`twilio autopilot:import [TYPE]`](#twilio-autopilotimport-type)

_Webhooks

* [`twilio autopilot:webhooks:create`](#twilio-autopilotwebhookscreate)
* [`twilio autopilot:webhooks:delete`](#twilio-autopilotwebhooksdelete)
* [`twilio autopilot:webhooks:list`](#twilio-autopilotwebhookslist)
* [`twilio autopilot:webhooks:update`](#twilio-autopilotwebhooksupdate)

_Other commands_

* [`twilio autopilot:modelbuilds:create`](#twilio-autopilotmodelbuildscreate)
* [`twilio autopilot:simulate`](#twilio-autopilotsimulate)
* [`twilio autopilot:queries:export`](#twilio-autopilotqueriesexport)
* [`twilio help [COMMAND]`](#twilio-help-command)

# Usage

## `twilio autopilot:create`

Create an assistant

```
USAGE
  $ twilio autopilot:create

OPTIONS
  -p, --profile=profile  Shorthand identifier for your profile.
  -s, --schema=schema    (required) [default: templates] schema path
```

_See code: [src/commands/autopilot/create.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/create.js)_

## `twilio autopilot:delete`

Delete an assistant

```
USAGE
  $ twilio autopilot:delete

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant sid
  --unique-name=unique-name          assistant unique name
```

_See code: [src/commands/autopilot/delete.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/delete.js)_

## `twilio autopilot:export`

Export an assistant

```
USAGE
  $ twilio autopilot:export

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  assistant sid
  --unique-name=unique-name          assistant unique name
```

_See code: [src/commands/autopilot/export.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/export.js)_

## `twilio autopilot:list`

List all autopilot assistant

```
USAGE
  $ twilio autopilot:list

OPTIONS
  -p, --profile=profile    Shorthand identifier for your profile.
  --properties=properties  [default: sid, uniqueName, friendlyName] The Autopilot Assistant List
```

_See code: [src/commands/autopilot/list.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/list.js)_

## `twilio autopilot:update`

Update an assistant

```
USAGE
  $ twilio autopilot:update

OPTIONS
  -p, --profile=profile      Shorthand identifier for your profile.
  -s, --schema=schema        (required) schema path
  --unique-name=unique-name  assistant unique name
```

_See code: [src/commands/autopilot/update.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/update.js)_

## `twilio autopilot:fields:create`

Create field of a task

```
USAGE
  $ twilio autopilot:fields:create

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task

  --field-type-sid=field-type-sid    The Field Type of the new field. Can be: a [Built-in
                                     FieldType](https://www.twilio.com/docs/assistant/api/built-in-field-types ), the
                                     `unique_name`, or the `sid` of a custom Field Type.

  --task-sid=task-sid                task sid

  --unique-name=unique-name          (required) field unique name
```

_See code: [src/commands/autopilot/fields/create.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/fields/create.js)_

## `twilio autopilot:fields:delete`

Delete a field of a task

```
USAGE
  $ twilio autopilot:fields:delete

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task

  --field-sid=field-sid              The Field Type of the new field. Can be: a [Built-in
                                     FieldType](https://www.twilio.com/docs/assistant/api/built-in-field-types ), the
                                     `unique_name`, or the `sid` of a custom Field Type.

  --task-sid=task-sid                task sid
```

_See code: [src/commands/autopilot/fields/delete.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/fields/delete.js)_

## `twilio autopilot:fields:list`

List all fields of a task

```
USAGE
  $ twilio autopilot:fields:list

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task
  --properties=properties            [default: sid, uniqueName, fieldType] The Autopilot Assistant Task List
  --task-sid=task-sid                task sid
```

_See code: [src/commands/autopilot/fields/list.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/fields/list.js)_

## `twilio autopilot:fieldtypes:create`

Create a field type of an assistant

```
USAGE
  $ twilio autopilot:fieldtypes:create

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant in which to create
  --friendly-name=friendly-name      friendly name for field type
  --unique-name=unique-name          (required) unique name for the field type
```

_See code: [src/commands/autopilot/fieldtypes/create.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/fieldtypes/create.js)_

## `twilio autopilot:fieldtypes:list`

List all FieldTypes of an assistant

```
USAGE
  $ twilio autopilot:fieldtypes:list

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task
  --properties=properties            [default: sid, uniqueName] The Autopilot Assistant FieldType List
```

_See code: [src/commands/autopilot/fieldtypes/list.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/fieldtypes/list.js)_

## `twilio autopilot:fieldtypes:update`

Update a fieldtype of an assistant

```
USAGE
  $ twilio autopilot:fieldtypes:update

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task
  --field-type-sid=field-type-sid    (required) field type sid
  --friendly-name=friendly-name      field type friendly name to update
  --unique-name=unique-name          field unique name
```

_See code: [src/commands/autopilot/fieldtypes/update.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/fieldtypes/update.js)_

## `twilio autopilot:fieldvalues:upload`

Upload FieldValues

```
USAGE
  $ twilio autopilot:fieldvalues:upload

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task
  --field-type-sid=field-type-sid    field type SID
  --file-name=file-name              (required) a CSV file of field values (one on each row with synonyms in columns)
```

_See code: [src/commands/autopilot/fieldvalues/upload.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/fieldvalues/upload.js)_

## `twilio autopilot:tasks:create`

Create a Task of an assistant

```
USAGE
  $ twilio autopilot:tasks:create

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task
  --friendly-name=friendly-name      friendly name for task
  --unique-name=unique-name          (required) unique name for task
```

_See code: [src/commands/autopilot/tasks/create.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/tasks/create.js)_

## `twilio autopilot:tasks:delete`

Delete a Task of an assistant

```
USAGE
  $ twilio autopilot:tasks:delete

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task
  --task-sid=task-sid                task sid
```

_See code: [src/commands/autopilot/tasks/delete.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/tasks/delete.js)_

## `twilio autopilot:tasks:list`

List all tasks of an assistant

```
USAGE
  $ twilio autopilot:tasks:list

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task
  --properties=properties            [default: sid, uniqueName, friendlyName] The Autopilot Assistant Task List
```

_See code: [src/commands/autopilot/tasks/list.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/tasks/list.js)_

## `twilio autopilot:tasks:update`

Update a Task of an assistant

```
USAGE
  $ twilio autopilot:tasks:update

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task
  --friendly-name=friendly-name      task friendly name to update
  --task-sid=task-sid                task sid
  --unique-name=unique-name          task unique name to update
```

_See code: [src/commands/autopilot/tasks/update.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/tasks/update.js)_

## `twilio autopilot:samples:upload`

Upload task samples

```
USAGE
  $ twilio autopilot:samples:upload

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task
  --file-name=file-name              (required) a CSV file of samples
  --task-sid=task-sid                task sid
```

_See code: [src/commands/autopilot/samples/upload.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/samples/upload.js)_

## `twilio autopilot:import [TYPE]`

Import a DialogFlow Agent/Alexa Interaction Model

```
USAGE
  $ twilio autopilot:import [TYPE]

ARGUMENTS
  TYPE  (dialogflow|alexa) [default: dialogflow] Type of import DialogFlow/Alexa

OPTIONS
  -a, --dfagent=dfagent          Dialogflow Agent Name
  -b, --dfbackup=dfbackup        Dialogflow Agent Backup Zip File Local Path
  -m, --model=model              Alexa Interaction Model File Path
  -p, --profile=profile          Shorthand identifier for your profile.

  -r, --redirectURL=redirectURL  [default: https://inquisitive-stretch-2083.twil.io/generic] Alexa Back-End Hanlder URL
                                 to send back the response

DESCRIPTION
  -> twilio autopilot:import dialogflow --dfbackup <dialogflow-backup-zip-file> --dfagent <dialogflow-agent-name>
  -> twilio autopilot:import alexa --model <alexa-interaction-model-file> [--redirectURL <alexa-back-end-hanlder-url>]
```

_See code: [src/commands/autopilot/import.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/import.js)_

## `twilio autopilot:webhooks:create`

Create Assistant Webhooks

```
USAGE
  $ twilio autopilot:webhooks:create

OPTIONS
  -e, --events=events                            (required) list of space-separated webhook events
  -m, --method=method                            which HTTP method to use
  -p, --profile=profile                          Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid              (required) assistant that owns the task
  -u, --webhookURL=webhookURL                    (required) the URL to send events to
  -w, --webhook-unique-name=webhook-unique-name  (required) unique name for webhook
```

_See code: [src/commands/autopilot/webhooks/create.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/webhooks/create.js)_

## `twilio autopilot:webhooks:delete`

Delete Assistant Webhooks

```
USAGE
  $ twilio autopilot:webhooks:delete

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task
  --webhook-sid=webhook-sid          SID of the webhook to delete
```

_See code: [src/commands/autopilot/webhooks/delete.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/webhooks/delete.js)_

## `twilio autopilot:webhooks:list`

List all webhooks of an assistant

```
USAGE
  $ twilio autopilot:webhooks:list

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task

  --properties=properties            [default: sid, uniqueName, webhookUrl, events, dateCreated, dateUpdated,
                                     webhookMethod] The Autopilot Assistant Webhooks List
```

_See code: [src/commands/autopilot/webhooks/list.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/webhooks/list.js)_

## `twilio autopilot:webhooks:update`

Update Assistant Webhooks

```
USAGE
  $ twilio autopilot:webhooks:update

OPTIONS
  -e, --events=events                            list of space-separated webhook events to update
  -m, --method=method                            which HTTP method to use to update
  -p, --profile=profile                          Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid              (required) assistant that owns the task
  -u, --webhookURL=webhookURL                    the URL to send events to update
  -w, --webhook-unique-name=webhook-unique-name  unique name for webhook to update
  --webhook-sid=webhook-sid                      SID of the webhook to update
```

_See code: [src/commands/autopilot/webhooks/update.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/webhooks/update.js)_

## `twilio autopilot:modelbuilds:create`

Create Model Builds

```
USAGE
  $ twilio autopilot:modelbuilds:create

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task
  -u, --callbackURL=callbackURL      URL to get notified of model build status
```

_See code: [src/commands/autopilot/modelbuilds/create.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/modelbuilds/create.js)_

## `twilio autopilot:simulate`

Simulate an assistant

```
USAGE
  $ twilio autopilot:simulate

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  (required) assistant sid
  -t, --text=text                    (required) User text input
```

_See code: [src/commands/autopilot/simulate.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/simulate.js)_

## `twilio autopilot:queries:export`

Export queries of an assistant

```
USAGE
  $ twilio autopilot:queries:export

OPTIONS
  -p, --profile=profile              Shorthand identifier for your profile.
  -q, --quantity=quantity            (required) number of queries to retrieve
  -s, --assistant-sid=assistant-sid  (required) assistant that owns the task
```

_See code: [src/commands/autopilot/queries/export.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/v1.0.0-beta.20/src/commands/autopilot/queries/export.js)_

## `twilio help [COMMAND]`

display help for twilio

```
USAGE
  $ twilio help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_
<!-- commandsstop -->