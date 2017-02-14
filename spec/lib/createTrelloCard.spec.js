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
      const fakeConfig = {
        url: 'www.test.com',
        meta: {
          x: 'foo'
        }
      };

      const fakeData = {foo: 'bar'};
      const axios = {
        post: function (url, data, meta) {
          expect(url).to.equal(fakeConfig.url);
          expect(data).to.equal(fakeData);
          expect(meta).to.equal(fakeConfig.meta);
          done();
        }
      };

      const createTrelloCard = createTrelloCardFactory(axios, fakeConfig);
      createTrelloCard(fakeData, () => 'test');
    });

    it('calls callback with response if axios post request is resolved', (done) => {
      const fakeUrl = 'www.test.com';
      const fakeData = {foo: 'bar'};
      const axios = {
        post: function (url, data) {
          return Promise.resolve({data: 'worked'});
        }
      };

      const createTrelloCard = createTrelloCardFactory(axios, fakeUrl);
      createTrelloCard(fakeData, (err, response) => {
        expect(err).to.equal(null);
        expect(response).to.eql({data: 'worked'});
        done();
      });
    });

    it('calls callback with error if axios post request is rejected', (done) => {
      const fakeUrl = 'www.test.com';
      const fakeData = {data: 'bar'};
      const axios = {
        post: function (url, data) {
          return Promise.reject(new Error('failed'));
        }
      };

      const createTrelloCard = createTrelloCardFactory(axios, fakeUrl);
      createTrelloCard(fakeData, (err, response) => {
        expect(err).to.equal('NC Helpdesk is experiencing some problems. If you can put your hand up, we will be over as soon as possible');
        expect(response).to.equal(undefined);
        done();
      });
    });
  });
});
