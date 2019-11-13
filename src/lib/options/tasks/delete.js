exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'assistant that owns the task',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'task-sid' : {
        type: 'string',
        describe: 'task sid',
        hidden : false
    }
}

exports.describe = `Delete a Task of an assistant`;