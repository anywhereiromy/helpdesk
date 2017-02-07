const _ = require('underscore');

function validateQuestionResponses (data, callback) {
  const responses = {
    'spent_ten': `${'You should really try and spend ten minutes solving problems by yourself. It\'s a great way to learn!'.red}\n`,
    'googled': `${'You will probably find that most people would have had a similar problem. Give our friend google a try!'.red}\n`,
    'ready_for_mentor': `${'OK. To make sure we can see everyone who needs help, please get your stuff together and try again when your ready :)'.red}\n`
  };

  const validateFields = _.pick(data, 'spent_ten', 'googled', 'ready_for_mentor');
  const validateValues = _.values(validateFields);

  if (validateValues.indexOf('No') > -1) {
    let reason = '';
    _.each(validateFields, function (value, key) {
      if (value === 'No') {
        reason = responses[key];
      }
    });
    if (reason) {
      return callback(new Error(reason));
    }
  }
  return callback(null, data);
}

module.exports = validateQuestionResponses;
