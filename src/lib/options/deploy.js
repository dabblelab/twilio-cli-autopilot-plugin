const shared_1 = require("twilio-run/dist/commands/shared");

exports.options = Object.assign({}, 
    shared_1.sharedCliOptions, 
    { 
        cwd: 
        {
            type: 'string',
            describe: 'Sets the directory from which to deploy',
            hidden : true
        }, 'functions-env': {
            type: 'string',
            describe: 'DEPRECATED: Use --environment instead',
            hidden: true,
        }, environment: {
            type: 'string',
            describe: 'The environment name (domain suffix) you want to use for your deployment',
            default: 'dev',
            hidden : true
        }, 'account-sid': {
            type: 'string',
            alias: 'u',
            describe: 'A specific account SID to be used for deployment. Uses fields in .env otherwise',
        }, 'auth-token': {
            type: 'string',
            describe: 'Use a specific auth token for deployment. Uses fields from .env otherwise',
        }, functions: {
            type: 'boolean',
            describe: 'Upload functions. Can be turned off with --no-functions',
            default: true,
            hidden : true
        }, assets: {
            type: 'boolean',
            describe: 'Upload assets. Can be turned off with --no-assets',
            default: true,
            hidden : true
        },
        'override-existing-project': {
            type: 'boolean',
            describe: 'Deploys Serverless project to existing service if a naming conflict has been found.',
            default: false,
        },
        'target': {
            type: 'string',
            describe: `deploy function, model or all of them. Options can only be "all", "function" or "model".`,
            alias : 't',
            default : 'all',
            options : ['all', 'function', 'model'],
            hidden: false
        }
    }
);


exports.describe = `Deploys existing functions and assets to Twilio`;