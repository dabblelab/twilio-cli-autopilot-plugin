exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'bot sid',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'properties' : {
        type: 'string',
        default : 'sid, uniqueName, friendlyName',
        describe: 'The Autopilot bot Task List',
        hidden : false
    }
}

exports.describe = `List all tasks for a bot`;