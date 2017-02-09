/* eslint-env mocha */
const rewire = require('rewire');
const expect = require('chai').expect;
const logWelcomeMessage = rewire('../../lib/logWelcomeMessage');

describe('logWelcomeMessage()', () => {
  it('is a function', () => {
    expect(logWelcomeMessage).to.be.a('function');
  });

  it('expects 1 argument', () => {
    expect(logWelcomeMessage.length).to.equal(1);
  });

  it('logs to the console the welcome message', (done) => {
    const msg = `${'N'.red}${'orthcoders'.white} ${'H'.red}${'elpdesk'.white}\n`;

    const revert = logWelcomeMessage.__set__({
      console: {
        log: function (chars) {
          expect(chars).to.equal(msg);
          revert();
          done();
        }
      }
    });

    logWelcomeMessage(() => {});
  });

  it('calls the callback with an empty object', () => {
    logWelcomeMessage(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.eql({});
    });
  });
});
