exports.options = {
    schema : {
        type: 'string',
        describe: 'schema path',
        default: 'templates',
        alias : 's',
        requiresArg : true,
        hidden : false
    }
}

exports.describe = `Create a bot`;