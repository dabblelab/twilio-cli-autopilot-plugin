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
        default : 'sid, uniqueName, friendlyName',
        describe: 'The Autopilot Assistant Task List',
        hidden : false
    }
}

exports.describe = `List all tasks of an assistant`;