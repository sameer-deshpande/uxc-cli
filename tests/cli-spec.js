
const expect = require('chai').expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
import chalk from 'chalk';
import * as uxcmessage from '../src/message';
import {cli} from '../src/cli';
import inquirer from 'inquirer';


chai.use(sinonChai);
describe('cli', () => {
    
    beforeEach(function() {
        sinon.spy(console, 'log');
        sinon.spy(console, 'error');
        sinon.spy(inquirer, 'prompt');
            
      });
    
      afterEach(function() {
        console.log.restore();
        console.error.restore();
        inquirer.prompt.restore();
      });
    it('invalid input should print error on console if invalid input is passed', () => {
        cli(['--aaa']);
        expect(console.error).to.be.called;
        expect(console.error).to.have.been.calledWith(uxcmessage.errors.invalid_argument_passed, 
            chalk.red.bold('ERROR'));  
    });
    it('should print help manual if --help is passed', () => {
        process.argv.push('--help');
        cli(process.argv);
        expect(console.log).to.be.called;
        expect(console.log).to.have.been.calledWith(uxcmessage.manual_text, chalk.black(''));  
    });
    it('calling "init" should open question prompt', () => {
        process.argv.push('init');
        cli(process.argv);
        expect(inquirer.prompt).to.be.called;
    });
})
