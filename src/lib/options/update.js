exports.options = {
    'schema' : {
        type: 'string',
        describe: 'schema path',
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

exports.describe = `Update an assistant`;