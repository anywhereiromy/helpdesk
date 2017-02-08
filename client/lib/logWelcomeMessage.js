require('colors');

function logWelcomeMessage (callback) {
  const data = {};
  console.log(`${'N'.red}${'orthcoders'.white} ${'H'.red}${'elpdesk'.white}\n`);
  callback(null, data);
}

module.exports = logWelcomeMessage;
