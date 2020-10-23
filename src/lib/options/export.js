exports.options = {
    'assistant-sid' : {
        type: 'string',
        describe: 'bot sid',
        alias : 's',
        hidden : false
    },
    'unique-name' : {
        type: 'string',
        describe: 'bot unique name',
        hidden : false
    }
}

exports.describe = `Export a bot schema`;