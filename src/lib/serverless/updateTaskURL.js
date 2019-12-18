const inquirer = require('inquirer'),
      prettyjsonstringify = require('pretty-json-stringify'),
      fs = require('fs'),
      _ = require('lodash');

const updateTaskURL = async(schemaPath, url) => {

    if (!fs.existsSync(schemaPath)) {

        throw new Error(`The file 'model' schema was not be found.`)
    }
    try{

        let schema = require(schemaPath);
        for (let [i, v] of schema.tasks.entries()){

            const actions = {
                    "actions" : [
                        {
                            "redirect": url
                        }
                    ]
                };

            schema.tasks[i].actions = actions;
        }
            // taskChoice = schema.tasks.map(t => t.uniqueName);
            // answers = await inquirer.prompt(
            //     [
            //         {
            //             type: 'checkbox',
            //             name: 'uniqueName',
            //             message: 'Choose tasks that uses Serverless function: ',
            //             choices: taskChoice
            //         }
            //     ]
            // );

            // if(answers.uniqueName.length){

            //     for(let item of answers.uniqueName){
            //         const index = _.findIndex(schema.tasks, {uniqueName : item});
            //         if(index >= 0 ){

            //             const actions = {
            //                 "actions" : [
            //                     {
            //                         "redirect": url
            //                     }
            //                 ]
            //             };

            //             schema.tasks[index].actions = actions;
            //         }
            //     }
            // }
            
            await fs.writeFileSync(schemaPath, prettyjsonstringify(schema))
            return;
    }
    catch(err){
        throw err;
    }
}

module.exports = updateTaskURL;