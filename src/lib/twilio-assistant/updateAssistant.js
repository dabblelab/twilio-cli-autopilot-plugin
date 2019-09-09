const fs = require('fs'),
      _ = require('lodash');

const updateAssistant = async (schemaFile, twilioClient) => {

  const {deleteFieldTypes, deleteAllFieldTypes, addFieldTypes} = require('./fieldType/fieldValue'),
        {deleteTaskFields, addTaskFields} = require('./tasks/fieldType'),
        {deleteTaskSamples, addTaskSamples} = require('./tasks/samples'),
        {deleteTask, addTasks} = require('./tasks/task');


  if (!fs.existsSync(schemaFile)) {
    throw new Error(`The file ${schemaFile} was not be found.`)
  }

  const schema = require(schemaFile);

  if (!schema.hasOwnProperty('uniqueName')) {
    throw new Error(`The 'uniqueName' property must be defined in your schema.`)
  }

  return await Promise.resolve()

    //fetch the assistant info
    .then(( ) => {

      return twilioClient.autopilot
        .assistants(schema.uniqueName)
        .fetch()
    })

    //update basic assistant properties and their actions and style sheet
    .then(assistant => {

      let params = {
        friendlyName: schema.friendlyName,
        uniqueName: schema.uniqueName,
        logQueries: (schema.hasOwnProperty('logQueries')) ? schema.logQueries : true
      }

      if(schema.hasOwnProperty('defaults') && schema.defaults.hasOwnProperty('defaults')){
        
        params['defaults'] = schema.defaults;
      }

      if(schema.hasOwnProperty('styleSheet') && schema.styleSheet.hasOwnProperty('style_sheet')){

        params['styleSheet'] = schema.styleSheet;
      }

      return twilioClient.autopilot
        .assistants(assistant.uniqueName)
        .update(params)
    })

    //removing tasks, samples, and field types
    .then(async (assistant) => {

        let taskList = [], sampleList = [], fieldList = [];
        await twilioClient.autopilot
                .assistants(assistant.uniqueName)
                .tasks
                .list()
                .then( async (tasks) => {

                  for(let task of tasks){

                    const index = _.findIndex(schema.tasks, { "uniqueName" : task.uniqueName});

                    if(index < 0){

                      await deleteTaskSamples(twilioClient, schema.uniqueName, task);
                      await deleteTaskFields(twilioClient, schema.uniqueName, task);
                      await deleteTask(twilioClient, schema.uniqueName, task.uniqueName);

                    }else{

                      sampleList = await deleteTaskSamples(twilioClient, schema.uniqueName, task, schema.tasks[index]);
                      fieldList = await deleteTaskFields(twilioClient, schema.uniqueName, task, schema.tasks[index]);

                      task.sampleList = sampleList;
                      task.fieldList = fieldList;
                      taskList.push(task);  
                    }
                  }

                  await deleteFieldTypes(twilioClient, schema.uniqueName, schema.fieldTypes);

                  for(let task of taskList){

                    await addTaskFields(twilioClient, assistant.uniqueName, task.uniqueName, task.fieldList, schema.tasks);
                    await addTaskSamples(twilioClient, assistant.uniqueName, task.uniqueName, task.sampleList, schema.tasks);
                  }
                })
        
        return {taskList : taskList, assistant : assistant};
    })

    // delete assistant custom field types
    .then( async ({taskList, assistant}) => {


      
      const tasks1 = (taskList.length >= schema.tasks.length) ? taskList : schema.tasks,
              tasks2 = (schema.tasks.length <= taskList.length) ? schema.tasks : taskList;

      const addTaskList = _.differenceBy(tasks1, tasks2, 'uniqueName');

      for(let task of addTaskList){

        await twilioClient.autopilot
        .assistants(schema.uniqueName)
        .tasks
        .create({ uniqueName: task.uniqueName, actions: task.actions });

        await addTaskFields(twilioClient, schema.uniqueName, task.uniqueName, task.fields);
        await addTaskSamples(twilioClient, schema.uniqueName, task.uniqueName, task.samples);
      }
      return assistant;
    })

    // updating/creating model build
    .then(async (assistant) => {

      if(schema.hasOwnProperty('modelBuild') && schema.modelBuild.hasOwnProperty('uniqueName')){

        await twilioClient.autopilot
          .assistants(assistant.uniqueName)
          .modelBuilds(schema.modelBuild.uniqueName)
          .update({ uniqueName: schema.modelBuild.uniqueName })
      }
      else{

        await twilioClient.autopilot
          .assistants(assistant.uniqueName)
          .modelBuilds
          .create({ uniqueName: `${schema.uniqueName}-${Date.now()}` })
      }
      

      return await assistant;
    })
    .catch(err => {
      throw err;
    })
}

module.exports = {updateAssistant};

