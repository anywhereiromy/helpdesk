function createTrelloCardFactory (axios, url) {
  return createTrelloCard.bind(null, axios, url);
}

function createTrelloCard (axios, url, data, callback) {
  axios.post(url, data)
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
