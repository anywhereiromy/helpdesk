const async = require('async');
const axios = require('axios');
const inquirer = require('inquirer');

const logWelcomeMessage = require('./lib/logWelcomeMessage');
const collectQuestionDataFactory = require('./lib/collectQuestionData');
const validateQuestionResponses = require('./lib/validateQuestionResponses');
const createTrelloCardFactory = require('./lib/createTrelloCard');

const createTrelloCard = createTrelloCardFactory(
  axios,
  'https://zhhoxsmbki.execute-api.us-west-2.amazonaws.com/prod/helloworld'
);
const collectQuestionData = collectQuestionDataFactory(inquirer);

function generateQuery () {
  async.waterfall([
    logWelcomeMessage,
    collectQuestionData,
    validateQuestionResponses
  ], function (error, data) {
    if (error) {
      return console.log(error.message);
    }
    createTrelloCard(data, function (err, response) {
      if (err) {
        return console.log('Whoops... Somthing went wrong! :O');
      }
      return console.log(response.data);
    });
  });
}

module.exports = generateQuery;
