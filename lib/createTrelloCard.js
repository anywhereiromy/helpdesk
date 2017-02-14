function createTrelloCardFactory (axios, config) {
  return createTrelloCard.bind(null, axios, config);
}

function createTrelloCard (axios, config, data, callback) {
  axios.post(config.url, data, config.meta)
    .then(
      function (response) {
        if (response.data.errorMessage) {
          callback(response.data.errorMessage);
        } else {
          callback(null, response);
        }
      },
      function (err) {
        if (err) {
          callback('NC Helpdesk is experiencing some problems. If you can put your hand up, we will be over as soon as possible');
        }
      });
}

module.exports = createTrelloCardFactory;
