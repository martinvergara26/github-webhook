const exec = require('child_process').exec;

const express = require('express');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  const event = req.get("x-github-event");
  const branch = req.body.ref;

  console.log("event", event);
  console.log("branch", branch);

  if(event === "push"){
    const deployProcess = exec('sh deploy.sh');

    deployProcess.stdout.on('data', function(data) {
      console.log(data);
    });
  }

  res.sendStatus(200);
});

const configuration = {
  port: 8000
};

app.listen(configuration.port, () => console.log(`App listening on port ${configuration.port}`));
