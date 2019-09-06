const expect = require('chai').expect;
const cmd = require('../util/cmdn');
import * as uxcmessage from '../../src/message';

describe('UXC CLI', () => {
  it('should raise error', async () => {
    const response = await cmd.execute(
      'C:/Users/deshqsam/Desktop/Projects/uxc-cli/bin/uxc',
      ['--abc']
    );
    expect(response.trim()).to.equal(uxcmessage.type.ERROR + ' '+ 'Invalid option. Use uxc -h or uxc --help for valid options');
  });
});