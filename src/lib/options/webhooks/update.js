exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'assistant sid',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'webhook-sid' : {
        type: 'string',
        describe: 'SID of the webhook to update',
        hidden : false
    },
    'webhook-unique-name' : {
        type: 'string',
        describe: 'unique name for webhook to update',
        alias : 'w',
        hidden : false
    },
    'events' : {
        type: 'string',
        describe: 'list of space-separated webhook events to update',
        alias : 'e',
        hidden : false
    },
    'webhookURL' : {
        type: 'string',
        describe: 'the URL to send events to update',
        alias : 'u',
        hidden : false
    },
    'method' : {
        type: 'string',
        describe: 'which HTTP method to use to update',
        alias : 'm',
        hidden : false
    }
}

exports.describe = `Update Assistant Webhooks`;