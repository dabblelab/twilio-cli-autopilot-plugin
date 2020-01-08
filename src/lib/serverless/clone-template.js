const git = require('simple-git/promise'),
      path = require("path"),
      request = require('request-promise'),
      ora = require('ora')
      urlUtils = require("@lib/url-utils");

const cloneTemplate = async(option, inquirer) => {

    const templateUrl = (option.url && urlUtils.isValidUrl(option.url)) ? option.url : 'https://raw.githubusercontent.com/Mohammad-Khalid/twilio-templates/master/templates.json';

    const templateMap = await getTemplateMap(templateUrl),
          templateList = Object.keys(templateMap),
          template_name = await getTargetTemplateName(templateList, option.template, inquirer),
          cloneTemplate = templateMap[template_name];

    await gitCloneTemplate(cloneTemplate, option.botName || '');

    return option.botName || cloneTemplateFolderName(cloneTemplate.gitUrl);
}


function getTemplateMap(templateUrl) {
    let GIT_ENDPOINT = templateUrl;
    let headers = {};
    headers['User-Agent'] = 'twilio-autopilot-cli/' + require('@root/package.json').version +
        ' Node/' + process.version;
    let params = {
        url: GIT_ENDPOINT,
        method: 'GET',
        headers: headers
    };
    return request(params)
    .then((response) => {

        let templatesJSONMap = response;
        try {

            if (typeof(response) === 'string') {
                templatesJSONMap = JSON.parse(response);
            }
        } catch (e) {

            throw new Error('Failed to parse the response from Twilio Autopilot API Service.');
        }
        return templatesJSONMap;

    }).catch((error) => {

        let err = 'Cannot retrieve Twilio Autopilot template list from GitHub repository.';
        throw new Error(err);
    });
}

function getTargetTemplateName(templateList, inputName, inquirer) {
    if (inputName) {
        if (templateList.indexOf(inputName) === -1) {
            let error = '[Error]: no template associate with the input name';
            throw new Error(error);
        } else {
            return inputName;
        }
    } else {
        let templateChoiceQuestion = {
            type: 'list',
            message: 'List of templates you can chose',
            name: 'templateName',
            choices: templateList.sort()
        };

        return inquirer.prompt([templateChoiceQuestion])
                .then((answer) => {
                    let templateName = answer.templateName;
                    return templateName;
                });
    }
}

const gitCloneTemplate = async(cloneTemplate, botName) =>{

    const spinner = ora().start(' Initializing Twilio Autopilot project from the chosen' +
    ' template...')
    
    let cloneDir = path.resolve(process.cwd(), botName || cloneTemplateFolderName(cloneTemplate.gitUrl));

    return git().silent(true)
           .clone(cloneTemplate.gitUrl, cloneDir)
           .then(async (status) => {

                spinner.succeed()
                return cloneDir;
           }).catch((error) => {

                spinner.fail();
                throw error;
           })

}

function cloneTemplateFolderName(templateURL){

    const baseName = path.basename(templateURL);
    return baseName.substring(0, baseName.indexOf("."));
}


module.exports = {
    cloneTemplate
};