import {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';
import chalk from 'chalk';
import * as uxcmessage from '../src/message';
import {createProject, printConsoleOutput} from '../src/main';

chai.use(sinonChai);
describe('main', () => {
    const chalkObject = chalk.bold('Text');
    beforeEach(function() {
        sinon.spy(console, 'log');
        sinon.spy(console, 'error');
        
      });
    
      afterEach(function() {
        console.log.restore();
        console.error.restore();
        
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
    
})