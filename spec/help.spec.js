/* eslint-env mocha */
const rewire = require('rewire');
const expect = require('chai').expect;
const generateQuery = rewire('../help');

describe('generateQuery()', () => {
  it('should be a function', () => {
    expect(generateQuery).to.be.a('function');
  });

  it('should expect no arguments', () => {
    expect(generateQuery.length).to.equal(0);
  });

  it('should console.log error message if async.waterfall throws error', (done) => {
    const async = generateQuery.__get__('async');
    async.waterfall = function (fns, final) {
      final({message: 'fail'});
    };

    const revertConsole = generateQuery.__set__({
      console: {
        log: function (chars) {
          expect(chars).to.equal('fail');
          revertConsole();
          done();
        }
      }
    });

    generateQuery();
  });

  it('should call createTrelloCard with data returned from async.waterfall', (done) => {
    const async = generateQuery.__get__('async');
    async.waterfall = function (fns, final) {
      final(null, 'test');
    };
    const revert = generateQuery.__set__({
      createTrelloCard: function (data, fn) {
        expect(data).to.equal('test');
        revert();
        done();
      }
    });

    generateQuery();
  });

  it('should console.log correct error message if createTrelloCard calls callback with error', (done) => {
    const async = generateQuery.__get__('async');
    async.waterfall = function (fns, final) {
      final(null, 'test');
    };
    const revert = generateQuery.__set__({
      console: {
        log: function (chars) {
          expect(chars).to.equal('Whoops... Somthing went wrong! :O');
          revert();
          done();
        }
      },
      createTrelloCard: function (data, fn) {
        fn({message: 'fail'});
      }
    });
    generateQuery();
  });

  it('should console.log the response.data passed to callback by createTrelloCard', (done) => {
    const async = generateQuery.__get__('async');
    async.waterfall = function (fns, final) {
      final(null, 'test');
    };
    const revert = generateQuery.__set__({
      console: {
        log: function (chars) {
          expect(chars).to.equal('pass');
          revert();
          done();
        }
      },
      createTrelloCard: function (data, fn) {
        fn(null, {data: 'pass'});
      }
    });
    generateQuery();
  });
});
