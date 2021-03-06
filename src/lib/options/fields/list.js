exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'bot sid',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'task-sid' : {
        type: 'string',
        describe: 'task sid',
        hidden : false
    },
    'properties': {
        type: 'string',
        default : 'sid, uniqueName, fieldType',
        describe: 'The Autopilot Assistant Task List'
    }
}

exports.describe = `List all fields of a task`;