const async = require('async');
const Trello = require('trello');
var trello = new Trello('acf4e043ff9c301761bae960a154dc91', '5a7607ac37729c9e1eaad8e95b19ef2b531fcac116338448635fe4db460a7bce');

module.exports = function (data, callback) {
  async.waterfall([
    getPeckingOrder,
    getCardsInProgress,
    function (waterfallData, callback) {
      waterfallData.req_data = data;
      addHelpRequestCard(waterfallData, callback);
    },
    assignMemberToCard
  ], function (err, result) {
    if (err && err.mentors_busy) {
      return addHelpRequestCard({req_data: data}, function (err, res2) {
        callback(null, res2);
      });
    }
    callback(null, result);
  });
};

function getPeckingOrder(finalCb) {
  trello.getCardsOnList('584e9e6ec615b488e2e6683f', function (error, cards) {
    async.mapSeries(cards, function (card, callback) {
      trello.getMember(card.name, function (err, memberData) {
        if (err) {
          console.log('error');
          return callback(err);
        }
        return callback(null, memberData.id);
      });
    }, function (err, results) {
      return finalCb(null, {
        pecking_order: results
      });
    })
  });
}

function getCardsInProgress(data, callback) {
  trello.getCardsOnList('584e9ea0686e8703a9b815f1', function (error, cards) {
    if (cards.length > data.pecking_order.length) {
      return callback({mentors_busy: true})
    }
    trello.getCardsOnList('584e9e9c44ebadda94730689', function (error, ticketsIn) {
      cards = cards.concat(ticketsIn);
      if (cards.length > data.pecking_order.length) {
        return callback({mentors_busy: true})
      }
      if (cards.length > 1) {
        // if there are two cards in play check who is free
        // find the assigned ids of the cards in play
        var busyMembers = cards.map(function (card) {
          return card.idMembers[0];
        });
        data.assign_to = data.pecking_order.filter(function (mentor) {
          return busyMembers.indexOf(mentor) === -1;
        })[0];
        return callback(null, data);
      }
      data.assign_to = data.pecking_order[cards.length || 0];
      return callback(null, data);
    });
  })
}

function addHelpRequestCard(data, callback) {
  trello.addCard(data.req_data.request_by, data.req_data.problem, '584e9e9c44ebadda94730689',
    function (error, trelloCard) {
      if (error) {
        console.log('Could not add card:', error);
      } else {
        data.new_card_id = trelloCard.id;
        return callback(null, data);
      }
    });
}

function assignMemberToCard(data, callback) {
  trello.makeRequest('post', '/1/cards/' + data.new_card_id + '/idMembers', {value: [data.assign_to]}, function (err, res) {
    return callback(null);
  });
}
