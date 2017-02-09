/* eslint-env mocha */
const expect = require('chai').expect;
const { checkIsEmpty, checkIsLonger } = require('../../helpers/validate');

describe('validate methods', () => {
  describe('checkIsEmpty()', () => {
    it('should be a function', () => {
      expect(checkIsEmpty).to.be.a('function');
    });
    it('should return true for empty string', () => {
      expect(checkIsEmpty('')).to.be.true;
    });
    it('should return true for empty array', () => {
      expect(checkIsEmpty('')).to.be.true;
    });
    it('should return false for string with chars', () => {
      expect(checkIsEmpty('test')).to.be.false;
    });
    it('should return false for arr with elements', () => {
      expect(checkIsEmpty([1, 2, 3])).to.be.false;
    });
  });
  describe('checkIsLonger()', () => {
    it('should be a function', () => {
      expect(checkIsLonger).to.be.a('function');
    });
    it('should return true for string longer than min value', () => {
      expect(checkIsLonger(1, 'a')).to.be.true;
      expect(checkIsLonger(5, 'abcdef')).to.be.true;
    });
    it('should return true for array longer than min value', () => {
      expect(checkIsLonger(3, [1, 2, 3])).to.be.true;
      expect(checkIsLonger(1, [1, 2])).to.be.true;
    });
    it('should return false for string length less than min', () => {
      expect(checkIsLonger(10, 'test')).to.be.false;
      expect(checkIsLonger(2, 't')).to.be.false;
    });
    it('should return false for arr with elements', () => {
      expect(checkIsLonger(3, [1])).to.be.false;
      expect(checkIsLonger(4, [1, 2, 3])).to.be.false;
    });
  });
});
