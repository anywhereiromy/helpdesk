/* eslint-env mocha */
const rewire = require('rewire');
const expect = require('chai').expect;
const generateQuery = rewire('../help');

describe('generateQuery()', () => {
  it('should be a function', () => {
    expect(generateQuery).to.be.a('function');
  });
  it('should expect no arguments', () => {
    
  });
});
