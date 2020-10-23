exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'bot sid',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'properties': {
        type: 'string',
        default : 'sid, uniqueName',
        describe: 'The Autopilot bot FieldType List'
    }
}

exports.describe = `List all FieldTypes for a bot`;