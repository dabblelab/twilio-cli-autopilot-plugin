exports.options = {
    'dfbackup' : {
        type: 'string',
        describe: 'Dialogflow Agent Backup Zip File Local Path',
        alias : 'b',
        multiple: false,
        exclusive: ['model', 'redirectURL'],
        hidden : false
    },
    'dfagent' : {
        type: 'string',
        describe: 'Dialogflow Agent Name',
        alias : 'a',
        multiple: false,
        exclusive: ['model', 'redirectURL'],
        hidden : false
    },
    'model' : {
        type: 'string',
        describe: 'Alexa Interaction Model File Path',
        alias : 'm',
        multiple: false,
        exclusive: ['dfbackup', 'dfagent'],
        hidden : false
    },
    'redirectURL' : {
        type: 'string',
        describe: 'Alexa Back-End Hanlder URL to send back the response',
        alias : 'r',
        multiple: false,
        exclusive: ['dfbackup', 'dfagent'],
        default : 'https://inquisitive-stretch-2083.twil.io/generic',
        hidden : false
    }
};

exports.describe = `Import a DialogFlow Agent/Alexa Interaction Model
-> twilio autopilot:import dialogflow --dfbackup <dialogflow-backup-zip-file> --dfagent <dialogflow-agent-name>
-> twilio autopilot:import alexa --model <alexa-interaction-model-file> [--redirectURL <alexa-back-end-hanlder-url>]`;