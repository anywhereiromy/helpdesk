function createTrelloCardFactory (axios, url) {
  return createTrelloCard.bind(null, axios, url);
}

function createTrelloCard (axios, url, data, callback) {
  axios.post(url, data)
    .then(function (response) {
      if (response.data.errorMessage) {
        callback(response.data.errorMessage);
      } else {
        callback(null, response);
      }
    });
}

module.exports = createTrelloCardFactory;
