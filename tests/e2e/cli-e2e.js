import {expect}  from 'chai';
import cmd, {DOWN, ENTER} from '../util/cmd';
import * as fs from '../util/fs';
import * as uxcmessage from '../../src/message';

let cleanUpFiles = async (fileName) => {
    if(fs.fileExists(fileName)){
        await fs.deleteFile(fileName);
    }
}

describe('Run the actual commands on the command prompt', () => {
    
      afterEach( () => {
        cleanUpFiles('./theme.css');
        cleanUpFiles('./theme.scss');
        cleanUpFiles('./UXC-Commands.MD');
        cleanUpFiles('./uxc.config.js');
        
      });
  it('should raise error if invalid option is passed', async () => {
    const response = await cmd.execute(
      './bin/uxc',
      ['--abc']
    );
    expect(response.trim()).to.equal(uxcmessage.type.ERROR + ' '+ 'Invalid option. Use uxc -h or uxc --help for valid options');
  });

  it('should create theme.css, UXC-Commands.MD and uxc.config.js in the cwd', async () => {
    const response = await cmd.execute(
      './bin/uxc',
      ['init'], [DOWN, ENTER]
    );
    await fs.expectFileToExist('./theme.css');
    await fs.expectFileToExist('./UXC-Commands.MD');
    await fs.expectFileToExist('./uxc.config.js');
    
  });

  it('should create theme.scss, UXC-Commands.MD and uxc.config.js in the cwd', async () => {
    const response = await cmd.execute(
      './bin/uxc',
      ['init'], [ENTER]
    );
    await fs.expectFileToExist('./theme.scss');
    await fs.expectFileToExist('./UXC-Commands.MD');
    await fs.expectFileToExist('./uxc.config.js');
    
  });

  it('should create theme.scss, UXC-Commands.MD and uxc.config.js in the cwd if --yes is passed', async () => {
    const response = await cmd.execute(
      './bin/uxc',
      ['init', '--yes']
    );
    await fs.expectFileToExist('./theme.scss');
    await fs.expectFileToExist('./UXC-Commands.MD');
    await fs.expectFileToExist('./uxc.config.js');
    
  });
});