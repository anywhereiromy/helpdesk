const app = require('express')();
const bodyParser = require('body-parser');
const trello = require('./lib/trello');

app.use(bodyParser.json());

app.post('/request', function (req, res) {
  trello(req.body, function (err) {
    res.status(200).send(`Thanks ${req.body.request_by} your request has been added to the quee. Someone will be with you soon.`);
  });
});

app.use('/*', function (req, res) {
  res.sendStatus(404);
});

app.listen(process.env.PORT || 3000);