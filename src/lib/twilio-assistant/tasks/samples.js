
const _ = require('lodash');

const deleteTaskSamples = async(twilioClient, assistantUniqueName, task, modelSamples = false) => {

    let sampleList = [];

    await twilioClient.autopilot
            .assistants(assistantUniqueName)
            .tasks(task.uniqueName)
            .samples
            .list()
            .then ( async (samples) => {

                for(let sample of samples){

                    if(modelSamples){

                        const s_index = _.findIndex(modelSamples.samples, { taggedText : sample.taggedText});

                        if(s_index < 0){

                            await twilioClient.autopilot
                            .assistants(assistantUniqueName)
                            .tasks(task.uniqueName)
                            .samples(sample.sid)
                            .remove()
                        }else{

                            sampleList.push(sample);
                        }
                    }
                    else{

                        await twilioClient.autopilot
                        .assistants(assistantUniqueName)
                        .tasks(task.uniqueName)
                        .samples(sample.sid)
                        .remove()
                    }
                }
            })
    return sampleList;
}




const addTaskSamples = async (twilioClient, assistantUniqueName, taskUniqueName, taskSamples, schemaTasks = false) => {

    if(schemaTasks){

        const index = _.findIndex(schemaTasks, {"uniqueName" : taskUniqueName});
        const taskSamples1 = (taskSamples.length >= schemaTasks[index].samples.length) ? taskSamples : schemaTasks[index].samples,
            taskSamples2 = (schemaTasks[index].samples.length <= taskSamples.length) ? schemaTasks[index].samples : taskSamples;

        const addSampleList = _.differenceBy(taskSamples1, taskSamples2, 'taggedText');
        for(let sample of addSampleList){

            await twilioClient.autopilot
            .assistants(assistantUniqueName)
            .tasks(taskUniqueName)
            .samples
            .create({ language: sample.language, taggedText: sample.taggedText })
        }
    }else{

        for(let sample of taskSamples){

            await twilioClient.autopilot
                .assistants(assistantUniqueName)
                .tasks(taskUniqueName)
                .samples
                .create({
                    "language" : sample.language,
                    "taggedText" : sample.taggedText
                })
        }
    }
    
    return assistantUniqueName;
}

module.exports = {
    deleteTaskSamples,
    addTaskSamples
}