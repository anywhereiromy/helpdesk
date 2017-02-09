function createTrelloCardFactory (axios, url) {
  return createTrelloCard.bind(null, axios, url);
}

function createTrelloCard (axios, url, data, callback) {
  axios.post(url, data)
    .then(function (response) {
      callback(null, response);
    })
    .catch(function (error) {
      if (error) {
        callback('Whoops... Somthing went wrong! :O');
      }
    });
}

module.exports = createTrelloCardFactory;
