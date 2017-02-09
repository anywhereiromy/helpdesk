/* eslint-env mocha */
const expect = require('chai').expect;
const validateQuestionResponses = require('../../lib/validateQuestionResponses');

describe('validateQuestionResponses', () => {
  it('should be a function', () => {
    expect(validateQuestionResponses).to.be.a('function');
  });

  it('expects 2 arguments', () => {
    expect(validateQuestionResponses.length).to.equal(2);
  });

  it('should call callback with data argument if data values are all yes', () => {
    const fakeData = {
      'spent_ten': 'Yes',
      'googled': 'Yes',
      'ready_for_mentor': 'Yes'
    };

    function testFn (err, res) {
      expect(err).to.equal(null);
      expect(res).to.equal(fakeData);
    }

    validateQuestionResponses(fakeData, testFn);
  });

  it('should callback with error if data values has one or more no values', () => {
    const fakeData = {
      'spent_ten': 'No',
      'googled': 'Yes',
      'ready_for_mentor': 'Yes'
    };

    function testFn (err, res) {
      expect(err).to.exist.and.be.instanceof(Error);
      expect(res).to.equal(undefined);
    }

    validateQuestionResponses(fakeData, testFn);
  });

  it('should callback with error with correct error message', () => {
    const fakeData1 = {
      'spent_ten': 'No',
      'googled': 'Yes',
      'ready_for_mentor': 'Yes'
    };
    const fakeData2 = {
      'spent_ten': 'Yes',
      'googled': 'No',
      'ready_for_mentor': 'No'
    };

    const errMessage1 = `1. ${'You should really try and spend ten minutes solving problems by yourself. It\'s a great way to learn!'.red}\n`;

    const errMessage2 = `2. ${'You will probably find that most people would have had a similar problem. Give our friend google a try!'.red}\n 3. ${'OK. To make sure we can see everyone who needs help, please get your stuff together and try again when your ready :)'.red}\n`;

    validateQuestionResponses(fakeData1, (err, res) => {
      expect(err.message).to.equal(errMessage1);
    });

    validateQuestionResponses(fakeData2, (err, res) => {
      expect(err.message).to.equal(errMessage2);
    });
  });
});
