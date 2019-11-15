exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'assistant sid',
        alias : 's',
        requiresArg : true,
        hidden : false
    },
    'quantity' : {
        type: 'string',
        describe: 'number of queries to retrieve',
        alias : 'q',
        requiresArg : true,
        hidden : false
    }
}

exports.describe = `Export queries of an assistant`;