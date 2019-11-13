exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'assistant that owns the task',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'webhook-unique-name' : {
        type: 'string',
        describe: 'unique name for webhook',
        alias : 'w',
        requiresArg : true,
        hidden : false
    },
    'events' : {
        type: 'string',
        describe: 'list of space-separated webhook events',
        alias : 'e',
        requiresArg : true,
        hidden : false
    },
    'webhookURL' : {
        type: 'string',
        describe: 'the URL to send events to',
        alias : 'u',
        requiresArg : true,
        hidden : false
    },
    'method' : {
        type: 'string',
        describe: 'which HTTP method to use',
        alias : 'm',
        hidden : false
    }
}

exports.describe = `Create Assistant Webhooks`;