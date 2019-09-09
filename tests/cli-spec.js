

import {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';
import chalk from 'chalk';
import * as uxcmessage from '../src/message';
import {cli} from '../src/cli';
import inquirer from 'inquirer';
import * as main from '../src/main';

chai.use(sinonChai);
describe('cli', () => {
    beforeEach(function() {
        sinon.spy(console, 'log');
        sinon.spy(console, 'error');
        sinon.stub(inquirer, 'prompt').resolves({init: true, manual: false, skipPrompts: false,template: 'SCSS'});   
        sinon.stub(main,'createProject');
      });
    
      afterEach(function() {
        console.log.restore();
        console.error.restore();
        inquirer.prompt.restore();
        main.createProject.restore();
      });
    it('invalid input should print error on console if invalid input is passed', async() => {
        await cli(['--aaa']);
        expect(console.log).to.be.called;
        expect(console.log).to.have.been.calledWith(uxcmessage.errors.invalid_argument_passed, 
            chalk.red.bold('ERROR'));  
    });
    it('should print help manual if --help is passed', async() => {
        await cli(['--help']);
        expect(console.log).to.be.called;
        expect(console.log).to.have.been.calledWith(uxcmessage.manual_text, chalk.black(''));  
    });
    it('calling "init" should open question prompt',  async() => { 
            await cli(['init']);
            expect(inquirer.prompt).to.be.called;
    });
    it('calling "init" should call "createProject"',  async() => {  
        await cli(['init']);
        expect(inquirer.prompt).to.be.called;
        let options = await inquirer.prompt();
        expect(main.createProject).to.be.calledWith(options);
    });
    it('calling "init --yes" should avoid inquirer call and call "createProject" directly',  async() => {  
        await cli(['init', '--yes']);
        expect(inquirer.prompt).to.not.be.called;
        expect(main.createProject).to.be.calledWith({init: true, manual: false, skipPrompts: true,template: 'SCSS'});
    });
})
