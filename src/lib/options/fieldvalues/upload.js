exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'assistant sid',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'file-name' : {
        type: 'string',
        describe: 'a CSV file of field values (one on each row with synonyms in columns)',
        requiresArg : true,
        hidden : false
    },
    'field-type-sid' : {
        type: 'string',
        describe: 'field type SID',
        hidden : false
    }
}

exports.describe = `Upload FieldValues`;