const async = require('async');
const axios = require('axios');
const inquirer = require('inquirer');

const { aws: awsConfig } = require('./config/config');
const logWelcomeMessage = require('./lib/logWelcomeMessage');
const collectQuestionDataFactory = require('./lib/collectQuestionData');
const validateQuestionResponses = require('./lib/validateQuestionResponses');
const createTrelloCardFactory = require('./lib/createTrelloCard');

const collectQuestionData = collectQuestionDataFactory(inquirer);

var createTrelloCard = createTrelloCardFactory(axios, {
  url: awsConfig.url,
  meta: {
    headers: {
      'x-api-key': awsConfig.apiKey
    }
  }
});

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
        return console.log(err);
      }
      return console.log(response.data);
    });
  });
}

module.exports = generateQuery;
