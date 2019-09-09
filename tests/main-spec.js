import {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';
import chalk from 'chalk';
import * as uxcmessage from '../src/message';
import {createProject, printConsoleOutput} from '../src/main';
import * as fs from './util/fs';

chai.use(sinonChai);

describe('main', () => {
    const chalkObject = chalk.bold('Text');
    beforeEach(function() {
        sinon.spy(console, 'log');
        sinon.spy(console, 'error');
        sinon.stub(process, 'exit');
      });
    
      afterEach(function() {
        console.log.restore();
        console.error.restore();
        process.exit.restore();
        fs.cleanUpFiles(['./theme.css','./theme.scss','./UXC-Commands.MD','./uxc.config.js']);
      });
    it('printConsoleOutput method prints log messages', () => {
        printConsoleOutput('Test Case 1',uxcmessage.type.log, chalkObject);
        expect(console.log).to.be.called;
        expect(console.log).to.have.been.calledWith('Test Case 1', 
        chalkObject);  
    });
    it('printConsoleOutput method prints error messages', () => {
        printConsoleOutput('Test Case 2',uxcmessage.type.error, chalkObject);
        expect(console.error).to.be.called;
        expect(console.error).to.have.been.calledWith('Test Case 2', 
        chalkObject);  
    });
    it('copyTemplateFiles method is called', async() => {
        await createProject({init: true, manual: false, skipPrompts: true,template: 'SCSS'});
        expect(console.log).to.be.called;
        expect(console.log).to.be.calledWith(uxcmessage.logs.file_copy_success, chalk.green.bold(uxcmessage.type.SUCCESS));
    });
    it('raise error if invalid template is passed', async() => {     
        //await createProject({init: true, manual: false, skipPrompts: true,template: 'AACC'});
        //expect(process.exit).to.be.calledWith(1);
        
    });
})