exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'bot sid',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'file-name' : {
        type: 'string',
        describe: 'a CSV file of samples',
        requiresArg : true,
        hidden : false
    },
    'task-sid' : {
        type: 'string',
        describe: 'task sid',
        hidden : false
    }
}

exports.describe = `Upload task samples`;