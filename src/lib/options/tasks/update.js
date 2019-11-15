exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'assistant sid',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'task-sid' : {
        type: 'string',
        describe: 'task sid',
        hidden : false
    },
    'unique-name' : {
        type: 'string',
        describe: 'task unique name to update',
        hidden : false
    },
    'friendly-name' : {
        type: 'string',
        describe: 'task friendly name to update',
        hidden : false
    }
}

exports.describe = `Update a Task of an assistant`;