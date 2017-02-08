/* eslint-env mocha */
const expect = require('chai').expect;
const createTrelloCardFactory = require('../../lib/createTrelloCard');

describe('createTrelloCardFactory()', () => {
  it('is a function', () => {
    expect(createTrelloCardFactory).to.be.a('function');
  });

  it('expects 2 arguments', () => {
    expect(createTrelloCardFactory.length).to.equal(2);
  });

  describe('createTrelloCardFactory() result', () => {
    it('calls the axios argument passed to factory with data and url arguments', (done) => {
      const fakeUrl = 'www.test.com';
      const fakeData = {foo: 'bar'};
      const axios = {
        post: function (url, data) {
          expect(url).to.equal(fakeUrl);
          expect(data).to.equal(fakeData);
          done();
        }
      };

      const createTrelloCard = createTrelloCardFactory(axios, fakeUrl);
      createTrelloCard(fakeData, () => 'test');
    });

    it('calls callback with response if axios post request is resolved', (done) => {
      const fakeUrl = 'www.test.com';
      const fakeData = {foo: 'bar'};
      const axios = {
        post: function (url, data) {
          return Promise.resolve('worked');
        }
      };

      const createTrelloCard = createTrelloCardFactory(axios, fakeUrl);
      createTrelloCard(fakeData, (err, response) => {
        expect(err).to.equal(null);
        expect(response).to.equal('worked');
        done();
      });
    });

    it('calls callback with error if axios post request is rejected', (done) => {
      const fakeUrl = 'www.test.com';
      const fakeData = {foo: 'bar'};
      const axios = {
        post: function (url, data) {
          return Promise.reject(new Error('failed'));
        }
      };

      const createTrelloCard = createTrelloCardFactory(axios, fakeUrl);
      createTrelloCard(fakeData, (err, response) => {
        expect(err).to.equal('Whoops... Somthing went wrong! :O');
        expect(response).to.equal(undefined);
        done();
      });
    });
  });
});
