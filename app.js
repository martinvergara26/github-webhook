const express = require('express');

const app = express();

app.use(function (req, res, next) {
  console.log("Method", req.method, req.originalUrl);
  console.log("Headers", req.headers);
  console.log("Original Url", req.originalUrl);

  console.log("Req.params", req.params);
  res.sendStatus(200);
});

const configuration = {
  port: 8000
}

app.listen(configuration.port, () => console.log(`App listening on port ${configuration.port}`));
