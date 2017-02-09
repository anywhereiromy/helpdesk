/* eslint-env mocha */
const expect = require('chai').expect;
const collectQuestionDataFactory = require('../../lib/collectQuestionData');

describe('collectQuestionData()', () => {
  it('is a function', () => {
    expect(collectQuestionDataFactory).to.be.a('function');
  });

  it('expects 1 argument', () => {
    expect(collectQuestionDataFactory.length).to.equal(1);
  });

  describe('collectQuestionDataFactory() result', () => {
    it('adds return value from inquirer.prompt to data.info if inquirer.prompt resolves', (done) => {
      const fakeData = {};
      const fakeInquirer = {
        prompt: function () {
          return Promise.resolve('fakeData');
        }
      };
      const collectQuestionData = collectQuestionDataFactory(fakeInquirer);

      function testFn () {
        expect(fakeData).to.eql({info: 'fakeData'});
        done();
      }

      collectQuestionData(fakeData, testFn);
    });

    it('calls callback with return value of inquirer.prompt when it resolves', (done) => {
      const fakeData = {};
      const fakeInquirer = {
        prompt: function () {
          return Promise.resolve('fakeData');
        }
      };
      const collectQuestionData = collectQuestionDataFactory(fakeInquirer);

      function testFn (err, res) {
        expect(err).to.equal(null);
        expect(res).to.eql('fakeData');
        done();
      }

      collectQuestionData(fakeData, testFn);
    });

    it('calls callback with err message if inquirer.prompt rejects', (done) => {
      const fakeData = {};
      const fakeInquirer = {
        prompt: function () {
          return Promise.reject('fakeData');
        }
      };
      const collectQuestionData = collectQuestionDataFactory(fakeInquirer);

      function testFn (err, res) {
        expect(err).to.equal('Something went wrong with the questionaire :(');
        expect(res).to.equal(undefined);
        done();
      }

      collectQuestionData(fakeData, testFn);
    });
  });
});
