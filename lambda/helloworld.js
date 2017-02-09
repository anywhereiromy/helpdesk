const slackConfig = require('./config').slack;

const trello = require('./trello');
const notifySlackFactory = require('./notifySlack');

const Slack = require('node-slack');
const slack = new Slack(slackConfig.HOOK_URL);
const slackPayload = {
  channel: slackConfig.CHANNEL,
  username: slackConfig.USERNAME,
  icon_url: slackConfig.BOT_AVATAR
};

const notifySlack = notifySlackFactory(slack, slackPayload);

exports.handler = function (event, context, callback) {
  console.log('EVENT RECEIVED: ', JSON.stringify(event, 2, null));
  trello(event, function (err) {
    if (err) {
      callback(err);
    }
    notifySlack(`@channel ${event.body.request_by} has made a request for help.`, function () {
      callback(null, `Thanks ${event.body.request_by} your request has been added to the quee. Someone will be with you soon.`);
    });
  });
};
