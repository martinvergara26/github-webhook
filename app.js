const express = require('express');

const app = express();

app.use(function (req, res, next) {
  console.log("<---------- First middleware --------->");
  console.log("Method", req.method, req.originalUrl);
  console.log("Headers", req.headers);
  console.log("Original Url", req.originalUrl);
  console.log("<---------- Ends First middleware --------->");
  next();
});

const configuration = {
  port: 9999
}

app.listen(configuration.port, () => console.log(`App listening on port ${configuration.port}`));
