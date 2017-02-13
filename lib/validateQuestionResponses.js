const _ = require('underscore');
require('colors');

function validateQuestionResponses (data, callback) {
  const responses = {
    'spent_ten': `1. ${'You should really try and spend ten minutes solving problems by yourself. It\'s a great way to learn!'.red}\n`,
    'googled': `2. ${'You will probably find that most people would have had a similar problem. Give Google a try!'.red}\n`,
    'ready_for_mentor': `3. ${'OK. To make sure we can see everyone who needs help, please get everything you need together and try again when you are ready :)'.red}\n`
  };

  const validateFields = _.pick(data, 'spent_ten', 'googled', 'ready_for_mentor');
  const validateValues = _.values(validateFields);

  if (validateValues.includes('No')) {
    let reason = '';
    _.each(validateFields, function (value, key) {
      if (value === 'No') {
        reason += responses[key];
      }
    });
    if (reason) {
      return callback(new Error(reason));
    }
  }
  return callback(null, data);
}

module.exports = validateQuestionResponses;
