const GITHUB_WEBHOOK_SECRET = 'martin';
const scriptAbsolutePath = '/home/ec2-user/Grundoon-CoreProcessing/init.sh deploy';

const expressConf = {
  port: 9999
};

const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const crypto = require('crypto')

// Calculate the X-Hub-Signature header value.
function getSignature(buf) {
  const hmac = crypto.createHmac("sha1", GITHUB_WEBHOOK_SECRET);
  hmac.update(buf, "utf-8");
  return "sha1=" + hmac.digest("hex");
}

// Verify function compatible with body-parser to retrieve the request payload.
// Read more: https://github.com/expressjs/body-parser#verify
function verifyRequest(req, res, buf, encoding) {
  var expected = req.headers['x-hub-signature'];
  var calculated = getSignature(buf);
  if (expected !== calculated) {
    throw new Error("Invalid signature.");
  } else {
    console.log("Valid signature!");
  }
}

// Express error-handling middleware function.
// Read more: http://expressjs.com/en/guide/error-handling.html
function abortOnError(err, req, res, next) {
  if (err) {
    console.log(err);
    res.status(400).send({ error: "Invalid signature." });
  } else {
    next();
  }
}

const app = express();

// body-parser is the first Express middleware.
app.use(bodyParser.json({ verify: verifyRequest }))

// Add an error-handling Express middleware function
// to prevent returning sensitive information.
app.use(abortOnError);

app.use(function (req, res, next) {
  const event = req.get("x-github-event");
  const branch = req.body.ref;

  console.log("event", event);
  console.log("branch", branch);

  if(event === "push" && branch === "refs/heads/master"){
    console.log("Pushed to master");

    const command = 'sh ' + scriptAbsolutePath;
    console.log("Executing command:", command);
    const deployProcess = exec(command);

    deployProcess.stdout.on('data', function(data) {
      console.log(data);
    });
  }

  res.sendStatus(200);
});

app.listen(expressConf.port, () => console.log(`App listening on port ${expressConf.port}`));
