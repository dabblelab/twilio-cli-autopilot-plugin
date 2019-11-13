exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'assistant that owns the task',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'properties': {
        type: 'string',
        default : 'sid, uniqueName',
        describe: 'The Autopilot Assistant FieldType List'
    }
}

exports.describe = `List all FieldTypes of an assistant`;