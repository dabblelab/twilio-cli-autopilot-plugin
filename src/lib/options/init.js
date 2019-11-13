exports.options = { 
    'account-sid': {
        type: 'string',
        alias: 'u',
        describe: 'A specific account SID to be used for deployment. Uses fields in .env otherwise',
        hidden : false
    }, 
    'auth-token': {
        type: 'string',
        describe: 'Use a specific auth token for deployment. Uses fields from .env otherwise',
        hidden : false
    },
    'bot-name' : {
        type : 'string',
        alias: 'n',
        describe : 'create new bot project with bot name',
        hidden : false
    }
}

exports.describe = `Init autopilot bot template`;