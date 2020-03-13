const express = require('express');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log("Method", req.method, req.originalUrl);

  console.log("Headers", req.headers);

  console.log("Req.params", req.params);

  console.log("Req.body", req.body);

  res.sendStatus(200);
});

const configuration = {
  port: 8000
}

app.listen(configuration.port, () => console.log(`App listening on port ${configuration.port}`));
