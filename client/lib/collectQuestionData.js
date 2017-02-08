const inquirer = require('inquirer');

function collectQuestionData (data, callback) {
  const selections = [{name: 'No'}, {name: 'Yes'}];
  const questions = [
    {
      type: 'input',
      name: 'request_by',
      message: 'What\'s your/your pairs name?\n'
    },
    {
      type: 'input',
      name: 'problem',
      message: 'Please describe in detail the problem you are encountering\n',
      validate: function (value) {
        if (value.length === 0) {
          return 'Problem description is required';
        }
        if (value.length < 20) {
          return `${value.length} character${value.length === 1 ? '' : 's'}?! Come on... Give us a bit more to do on!`;
        }
        return true;
      }
    },
    {
      type: 'list',
      message: 'Becoming an exceptional Software Developer pretty much boils down to your problem solving skills\nHave you spent ten minutes in your pair attempting to solve the issue?',
      name: 'spent_ten',
      choices: selections
    },
    {
      type: 'list',
      message: 'Many software developers will have encountered the same or similar issue.\nHave you researched your issue Google, MDN and Stack Overflow?\nIf you have a error message in your terminal/console that entire message is a good place to start!',
      name: 'googled',
      choices: selections
    },
    {
      type: 'list',
      message: 'Are you fully ready to explain your problem?\nYou will need to be able to repeat the problem with your mentor and explain the path you have taken so far?',
      name: 'ready_for_mentor',
      choices: selections
    }
  ];
  inquirer.prompt(questions).then(function (answers) {
    data.info = answers;
    callback(null, answers);
  });
}

collectQuestionData({}, function (err, answers) {
  console.log(err, answers);
});

module.exports = collectQuestionData;
