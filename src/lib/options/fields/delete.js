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
    'field-sid' : {
        type: 'string',
        describe: 'The Field Type of the new field. Can be: a [Built-in FieldType](https://www.twilio.com/docs/assistant/api/built-in-field-types ), the `unique_name`, or the `sid` of a custom Field Type.',
        hidden : false
    }
}

exports.describe = `Delete a field of a task`;