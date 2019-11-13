exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'assistant that owns the task',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'properties' : {
        type: 'string',
        describe: 'The Autopilot Assistant Webhooks List',
        default: 'sid, uniqueName, webhookUrl, events, dateCreated, dateUpdated, webhookMethod',
        hidden : false
    }
}

exports.describe = `List all webhooks of an assistant`;