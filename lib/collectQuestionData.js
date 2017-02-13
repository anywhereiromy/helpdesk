const { checkIsLonger, checkIsEmpty } = require('../helpers/validate');

function collectQuestionData (inquirer, data, callback) {
  const selections = [{name: 'No'}, {name: 'Yes'}];
  const questions = [
    {
      type: 'input',
      name: 'request_by',
      message: 'What\'s your/your pairs name?\n',
      validate: function (value) {
        return checkIsEmpty(value) ? 'Your name(s) are required' : true;
      }
    },
    {
      type: 'input',
      name: 'problem',
      message: 'Please describe in detail the problem you are encountering\n',
      validate: function (value) {
        if (checkIsEmpty(value)) {
          return 'Problem description is required';
        }
        if (!checkIsLonger(20, value)) {
          return `${value.length} character${value.length === 1 ? '' : 's'}?! Come on... Give us a bit more to do on!`;
        }
        return true;
      }
    },
    {
      type: 'list',
      message: 'Have you spent 10 mins trying to solve your problem?',
      name: 'spent_ten',
      choices: selections
    },
    {
      type: 'list',
      message: 'Have you researched your issue/error on Google, MDN and Stack Overflow?',
      name: 'googled',
      choices: selections
    },
    {
      type: 'list',
      message: 'Are you fully ready to explain your problem?\nAre you able to tell us where the error occured and what type of error it is?',
      name: 'ready_for_mentor',
      choices: selections
    }
  ];
  inquirer.prompt(questions)
    .then(function (answers) {
      data.info = answers;
      callback(null, answers);
    })
    .catch(function (err) {
      if (err) {
        return callback('Something went wrong with the questionaire :(');
      }
    });
}

function collectQuestionDataFactory (inquirer) {
  return collectQuestionData.bind(null, inquirer);
}

module.exports = collectQuestionDataFactory;
