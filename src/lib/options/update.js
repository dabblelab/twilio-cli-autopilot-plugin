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
        describe: 'bot unique name',
        hidden : false
    }
}

exports.describe = `Update a bot`;