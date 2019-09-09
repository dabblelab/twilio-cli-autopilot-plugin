
const bulkUploadFieldValues = async (assistantSid, fieldUniqueName, csvFile, twilioClient) => {

  const fs = require('fs'),
        fieldValue = require('./fieldType/fieldValue');

  if (!fs.existsSync(csvFile)) {

    throw new Error(`The file ${csvFile} was not be found.`)
  }

  return await Promise.resolve()

    
    
    //assistant info
    .then ( async () => {

      return twilioClient.autopilot
        .assistants(assistantSid)
        .fetch().then((assistant) => {

          return assistant;
        })
    })

    .then( async (assistant) => {

      await fieldValue.addFieldValues(twilioClient, assistant.uniqueName, fieldUniqueName, csvFile)
      return assistant;
    })

    .catch(err => {
      throw err;
    })

}

module.exports = { bulkUploadFieldValues };