exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'bot sid',
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
        describe: 'field unique name',
        requiresArg : true,
        hidden : false
    },
    'field-type-sid' : {
        type: 'string',
        describe: 'The Field Type of the new field. Can be: a [Built-in FieldType](https://www.twilio.com/docs/autopilot/built-in-field-types), the `unique_name`, or the `sid` of a custom Field Type.',
        hidden : false
    }
}

exports.describe = `Create field of a task`;