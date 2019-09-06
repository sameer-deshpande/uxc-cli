
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createProject, printConsoleOutput } from './main';
import * as uxcmessage from './message';

function parseArgumentsIntoOptions(rawArgs) {

    const args = {
        'help': rawArgs.includes('--help') || rawArgs.includes('-h'),
        'yes': rawArgs.includes('--yes') || rawArgs.includes('-y'),
        'init': rawArgs.includes('init')
    }

    return {
        manual: args['help'] || false,
        init: args['init'],
        skipPrompts: args['yes'] || false,
    };
}

async function promptForMissingOptions(options) {
    const defaultTemplate = uxcmessage.template.stylesheet.SCSS;
    if (options.skipPrompts) {
        return {
          ...options,
          template: options.template || defaultTemplate,
        };
      }
    const questions = [];
    if (!options.template) {
      questions.push({
        type: 'list',
        name: 'template',
        message: uxcmessage.question_for_stylesheet,
        choices: [uxcmessage.template.stylesheet.SCSS, uxcmessage.template.stylesheet.CSS],
        default: defaultTemplate,
      });
    }
    const answers = await inquirer.prompt(questions);
    return {
      ...options,
      template: options.template || answers.template
    };
}

function isInvalidInput(options){
    return Object.values(options).every(v=>v == false);
}

function showManual(options){
    if(options.manual){
        printConsoleOutput(uxcmessage.manual_text, 
            uxcmessage.type.log, 
            chalk.black(''));
    }
}

export async function cli(args) {
    let options = null;
    try{
        options = parseArgumentsIntoOptions(args);
        
        if(isInvalidInput(options)){
            printConsoleOutput(uxcmessage.errors.invalid_argument_passed, 
                uxcmessage.type.log,
                chalk.red.bold('ERROR'));
        }
        else{
            if(options.init){
                options = await promptForMissingOptions(options);
                await createProject(options);
            }           
            else{ 
                options.manual = true;          
                showManual(options);
            }
        }
        
        
    }catch(err){
        throw err;

    }
    
}