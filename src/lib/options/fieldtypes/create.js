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
        describe: 'unique name for the field type',
        requiresArg : true,
        hidden : false
    },
    'friendly-name' : {
        type: 'string',
        describe: 'friendly name for field type',
        hidden : false
    }
}

exports.describe = `Create a field type of an assistant`;