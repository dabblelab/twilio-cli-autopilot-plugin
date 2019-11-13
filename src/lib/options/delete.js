exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'assistant sid',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'unique-name' : {
        type: 'string',
        describe: 'assistant unique name',
        hidden : false
    }
}

exports.describe = `Delete an assistant`;