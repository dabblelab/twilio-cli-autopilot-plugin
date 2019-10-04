Twilio Autopilot Plugin for the Twilio CLI
================

A plugin for the [Twilio CLI](https://github.com/twilio/twilio-cli) that merges and extends functionality from the [Autopilot CLI](https://github.com/dabblelab/twilio-cli-autopilot-plugin).  

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@dabblelab/plugin-autopilot.svg)](https://npmjs.org/package/@dabblelab/plugin-autopilot)
[![Downloads/week](https://img.shields.io/npm/dw/@dabblelab/plugin-autopilot.svg)](https://npmjs.org/package/@dabblelab/plugin-autopilot)
[![License](https://img.shields.io/npm/l/@dabblelab/plugin-autopilot.svg)](https://img.shields.io/github/license/dabblelab/twilio-cli-autopilot-plugin)

<!-- toc -->

- [Requirements](#requirements)
  - [Install the Twilio CLI](#install-the-twilio-cli)
- [Usage](#usage)
- [Commands](#commands)
  - [`twilio autopilot:create`](#twilio-autopilotcreate)
  - [`twilio autopilot:list`](#twilio-autopilotlist)
  - [`twilio autopilot:update`](#twilio-autopilotupdate)
  - [`twilio autopilot:delete`](#twilio-autopilotdelete)
  - [`twilio autopilot:export`](#twilio-autopilotexport)
  - [`twilio autopilot:simulate`](#twilio-autopilotsimulate)
  - [`twilio autopilot:field`](#twilio-autopilotfield)
  - [`twilio autopilot:import [TYPE]`](#twilio-autopilotimport-type)
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

- [Requirements](#requirements)
  - [Install the Twilio CLI](#install-the-twilio-cli)
- [Usage](#usage)
- [Commands](#commands)
  - [`twilio autopilot:create`](#twilio-autopilotcreate)
  - [`twilio autopilot:list`](#twilio-autopilotlist)
  - [`twilio autopilot:update`](#twilio-autopilotupdate)
  - [`twilio autopilot:delete`](#twilio-autopilotdelete)
  - [`twilio autopilot:export`](#twilio-autopilotexport)
  - [`twilio autopilot:simulate`](#twilio-autopilotsimulate)
  - [`twilio autopilot:field`](#twilio-autopilotfield)
  - [`twilio autopilot:import [TYPE]`](#twilio-autopilotimport-type)

## `twilio autopilot:create`

Create an assistant
```
USAGE
  $ twilio autopilot:create

OPTIONS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.

  -o=(columns|json|tsv)            [default: columns] Format of command output.

  -p, --profile=profile            Shorthand identifier for your profile.

  -s, --schema=schema              (required) [default: templates] schema path
 ```

_See code: [src/commands/autopilot/create.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/master/src/commands/autopilot/create.js)_

 ## `twilio autopilot:list`

List all autopilot assistant
```
USAGE
  $ twilio autopilot:list

OPTIONS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.

  -o=(columns|json|tsv)            [default: columns] Format of command output.

  -p, --profile=profile            Shorthand identifier for your profile.

  --properties=properties          [default: sid, uniqueName, friendlyName] The Autopilot Assistant List.
 ```

_See code: [src/commands/autopilot/list.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/master/src/commands/autopilot/list.js)_

 ## `twilio autopilot:update`

Update an assistant
```
USAGE
  $ twilio autopilot:update

OPTIONS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.

  -o=(columns|json|tsv)            [default: columns] Format of command output.

  -p, --profile=profile            Shorthand identifier for your profile.

  -s, --schema=schema              (required) schema path
 ```

_See code: [src/commands/autopilot/update.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/master/src/commands/autopilot/update.js)_

 ## `twilio autopilot:delete`

Delete an assistant
```
USAGE
  $ twilio autopilot:delete

OPTIONS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.

  -o=(columns|json|tsv)            [default: columns] Format of command output.

  -p, --profile=profile            Shorthand identifier for your profile.

  -s, --assistantSid=assistantSid  (required) assistant sid
 ```

_See code: [src/commands/autopilot/delete.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/master/src/commands/autopilot/delete.js)_

## `twilio autopilot:export`

Export an assistant
```
USAGE
  $ twilio autopilot:export

OPTIONS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.

  -o=(columns|json|tsv)            [default: columns] Format of command output.

  -p, --profile=profile            Shorthand identifier for your profile.
 ```

_See code: [src/commands/autopilot/export.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/master/src/commands/autopilot/export.js)_

 ## `twilio autopilot:simulate`

Simulate an assistant
```
USAGE
  $ twilio autopilot:simulate

OPTIONS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.

  -o=(columns|json|tsv)            [default: columns] Format of command output.

  -p, --profile=profile            Shorthand identifier for your profile.

  -s, --assistantSid=assistantSid  (required) assistant sid

  -t, --text=text                  (required) User text input
 ```

_See code: [src/commands/autopilot/simulate.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/master/src/commands/autopilot/simulate.js)_

 ## `twilio autopilot:import [TYPE]`

Import a DialogFlow Agent/Alexa Interaction Model
```
USAGE
  $ twilio autopilot:import [TYPE]

ARGUMENTS
  TYPE  (dialogflow|alexa) [default: dialogflow] Type of import DialogFlow/Alexa

OPTIONS
  -a, --dfagent=dfagent            Dialogflow Agent Name

  -b, --dfbackup=dfbackup          Dialogflow Agent Backup Zip File Local Path

  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.

  -m, --model=model                Alexa Interaction Model File Path

  -o=(columns|json|tsv)            [default: columns] Format of command output.

  -p, --profile=profile            Shorthand identifier for your profile.

  -r, --redirectURL=redirectURL    [default: https://inquisitive-stretch-2083.twil.io/generic] Alexa Back-End Hanlder URL                                     to send back the response

DESCRIPTION
  - twilio autopilot:import dialogflow --dfbackup <dialogflow-backup-zip-file> --dfagent <dialogflow-agent-name>
  - twilio autopilot:import alexa --model <alexa-interaction-model-file> [--redirectURL <alexa-back-end-hanlder-url>]
 ```

_See code: [src/commands/autopilot/import.js](https://github.com/tingiris/twilio-cli-autopilot-plugin/blob/master/src/commands/autopilot/import.js)_