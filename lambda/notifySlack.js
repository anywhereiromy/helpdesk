function notifySlack (slack, payload, message, callback) {
  payload.text = message;
  slack.send(payload);
  callback();
}

function notifySlackFactory (slack, payload) {
  return notifySlack.bind(null, slack, payload);
}

module.exports = notifySlackFactory;
