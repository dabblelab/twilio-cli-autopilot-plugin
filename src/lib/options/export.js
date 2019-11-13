exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'assistant sid',
        alias : 's',
        hidden : false
    },
    'unique-name' : {
        type: 'string',
        describe: 'assistant unique name',
        hidden : false
    }
}

exports.describe = `Export an assistant`;