exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'bot sid',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'text' : {
        type: 'string',
        describe: 'User text input',
        alias : 't',
        requiresArg : true,
        hidden : false
    }
}

exports.describe = `Simulate a bot interaction`;