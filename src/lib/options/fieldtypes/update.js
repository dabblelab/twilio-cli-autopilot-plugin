exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'bot sid',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'field-type-sid' : {
        type: 'string',
        describe: 'field type sid',
        requiresArg : true,
        hidden : false
    },
    'unique-name' : {
        type: 'string',
        describe: 'field unique name',
        hidden : false
    },
    'friendly-name' : {
        type: 'string',
        describe: 'field type friendly name to update',
        hidden : false
    }
}

exports.describe = `Update a fieldtype for a bot`;