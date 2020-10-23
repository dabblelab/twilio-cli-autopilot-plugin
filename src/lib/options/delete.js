exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'bot sid',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'unique-name' : {
        type: 'string',
        describe: 'bot unique name',
        hidden : false
    }
}

exports.describe = `Delete a bot`;