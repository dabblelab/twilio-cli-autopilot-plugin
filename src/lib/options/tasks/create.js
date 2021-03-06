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
        describe: 'unique name for task',
        requiresArg : true,
        hidden : false
    },
    'friendly-name' : {
        type: 'string',
        describe: 'friendly name for task',
        hidden : false
    }
}

exports.describe = `Create a Task for a bot`;