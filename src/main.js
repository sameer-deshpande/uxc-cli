import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import Listr from 'listr';

import * as uxcmessage from './message';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
 return copy(options.templateDirectory, options.targetDirectory, {
   clobber: false,
 });
}

async function copyConfigFiles(options) {
    return copy(options.configDirectory, options.targetDirectory, {
      clobber: false,
    });
   }

export function printConsoleOutput(message, type, chalkObject){
  console[type](message, chalkObject);
}

export async function createProject(options) {
 options = {
   ...options,
   targetDirectory: options.targetDirectory || process.cwd(),
 };

 const templateDir = path.resolve(
    __dirname,
   '../templates',
   options.template.toLowerCase()
 );

 const configDir = path.resolve(
    __dirname,
   '../templates',
   'config'
 );

 options.templateDirectory = templateDir;
 options.configDirectory = configDir;

 try {
   await access(templateDir, fs.constants.R_OK);
 } catch (err) {
    printConsoleOutput(uxcmessage.errors.invalid_template, 
    uxcmessage.type.log, 
    chalk.red.bold(uxcmessage.type.ERROR));

    process.exit(1);
 }

 const tasks = new Listr([
    {
      title: uxcmessage.copy_stylesheet_files,
      task: () => copyTemplateFiles(options),
    },
    {
      title: uxcmessage.copy_config_files,
      task: () => copyConfigFiles(options),
    },
  ]);

  await tasks.run();

  printConsoleOutput(uxcmessage.logs.file_copy_success, 
  uxcmessage.type.log, 
  chalk.green.bold(uxcmessage.type.SUCCESS));
 return true;
}