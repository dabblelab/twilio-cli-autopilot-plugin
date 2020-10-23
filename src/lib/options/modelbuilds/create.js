exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'bot sid',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'callbackURL' : {
        type: 'string',
        describe: 'URL to get notified of model build status',
        alias : 'u',
        hidden : false
    }
}

exports.describe = `Create Model Builds`;