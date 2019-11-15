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
        describe: 'SID of the webhook to delete',
        hidden : false
    }
}

exports.describe = `Delete Assistant Webhooks`;