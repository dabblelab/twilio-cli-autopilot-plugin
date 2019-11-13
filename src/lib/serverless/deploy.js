"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const serverless_api_1 = require("@twilio-labs/serverless-api"),
      common_tags_1 = require("common-tags"),
      path_1 = __importDefault(require("path")),
      check_credentials_1 = require("twilio-run/dist/checks/check-credentials"),
      project_structure_1 = __importDefault(require("twilio-run/dist/checks/project-structure")),
      deploy_1 = require("twilio-run/dist/config/deploy"),
      utils_1 = require("twilio-run/dist/serverless-api/utils"),
      logger_1 = require("twilio-run/dist/utils/logger"),
      utils_2 = require("twilio-run/dist/commands/utils"),
      debug = logger_1.getDebugFunction('twilio-run:deploy');

function logError(msg) {
    logger_1.logger.error(msg);
}

function handleError(err, spinner, flags, config) {
    debug('%O', err);
    spinner.fail('Failed Deployment');
    if (err.name === 'conflicting-servicename') {
        const fullCommand = utils_2.getFullCommand(flags);
        const messageBody = common_tags_1.stripIndent `
      - Deploy to the existing service with the name "${err['serviceName'] || config.serviceName}"
        > ${utils_2.constructCommandName(fullCommand, 'deploy', [
            '--override-existing-project',
        ])}
    `;
        logger_1.logger.error(messageBody, err.message);
    }
    else if (err.name === 'HTTPError') {
        const responseBody = JSON.parse(err.body);
        const messageBody = common_tags_1.stripIndent `
      ${responseBody.message}

      More info: ${responseBody.more_info}
    `;
        logger_1.logger.error(messageBody);
    }
    else {
        logger_1.logger.error(err.message);
    }
    process.exit(1);
}

function handler(flags, externalCliOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.setLogLevelByName(flags.logLevel);
        const cwd = path_1.default.resolve(process.cwd(), 'function');
        flags.cwd = cwd;
        const command = utils_2.getFullCommand(flags);
        yield project_structure_1.default(cwd, command, true);
        let config;
        try {
            config = yield deploy_1.getConfigFromFlags(flags, externalCliOptions);
        }
        catch (err) {
            debug(err);
            logError(err.message);
            process.exit(1);
            return;
        }
        if (!config) {
            logError('Internal Error');
            process.exit(1);
            return;
        }
        debug('Deploy Config %P', config);
        check_credentials_1.checkConfigForCredentials(config);
        const spinner = logger_1.getOraSpinner('Deploying Function').start();
        try {
            const client = new serverless_api_1.TwilioServerlessApiClient(config);
            client.on('status-update', evt => {
                spinner.text = evt.message + '\n';
            });
            const result = yield client.deployLocalProject(config);
            spinner.text = 'Serverless function successfully deployed\n';
            spinner.succeed();
            const { serviceSid, buildSid } = result;
            yield utils_1.saveLatestDeploymentData(config.cwd, serviceSid, buildSid, config.accountSid.startsWith('AC')
                ? config.accountSid
                : externalCliOptions && externalCliOptions.accountSid);

            return {
                url : `https://${result.domain}${result.functionResources[0].path}`
            };
        }
        catch (err) {
            handleError(err, spinner, flags, config);
        }
    });
}

exports.handler = handler;

function optionBuilder(yargs) {
    yargs = yargs
        .example('$0 deploy', 'Deploys all functions and assets in the current working directory')
        .example('$0 deploy --environment=stage', 'Creates an environment with the domain suffix "stage"');
    yargs = Object.keys(exports.cliInfo.options).reduce((yargs, name) => {
        return yargs.option(name, exports.cliInfo.options[name]);
    }, yargs);
    return yargs;
}

exports.command = ['deploy'];
exports.builder = optionBuilder;
