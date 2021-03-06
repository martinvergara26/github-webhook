const dotenv = require('dotenv');
dotenv.config();

const expressConf = {
  port: 9999
};

const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const crypto = require('crypto')
const fs = require('fs');

// Calculate the X-Hub-Signature header value.
function getSignature(buf) {
  const hmac = crypto.createHmac("sha1", process.env.GB_WEBHOOK_SECRET);
  hmac.update(buf, "utf-8");
  return "sha1=" + hmac.digest("hex");
}

// Verify function compatible with body-parser to retrieve the request payload.
// Read more: https://github.com/expressjs/body-parser#verify
function verifyRequest(req, res, buf, encoding) {
  let valid = false;

  const gitlabToken = req.get('x-gitlab-token');
  if(gitlabToken){
    valid = gitlabToken === process.env.GITLAB_SECRET_TOKEN;
  } else {
    const given = req.get('x-hub-signature');
    const expected = getSignature(buf);
    valid = given === expected
  }

  if (valid) {
    console.log("Valid signature!");
  } else {
    throw new Error("Invalid signature.");
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

const index = express();

// body-parser is the first Express middleware.
index.use(bodyParser.json({ verify: verifyRequest }))

// Add an error-handling Express middleware function
// to prevent returning sensitive information.
index.use(abortOnError);

function runCommand() {
  const options = {cwd: process.env.DEPLOY_PATH};
  const cb = (error) => {
    if(error){
      console.log("Error ", error);
    }
  };

  const command = process.env.DEPLOY_COMMAND;
  console.log("Executing command:", command);
  const deployProcess = exec(command, options, cb);

  deployProcess.stdout.on('data', function (data) {
    console.log(data);
  });

  deployProcess.stderr.on('data', (data) => {
    console.error(data);
  });
}

index.use(function (req, res, next) {
  const event = req.get("x-github-event") || req.get('X-Gitlab-Event');
  const branch = req.body.ref;

  console.log("event", event);
  console.log("branch", branch);

  if((event === "push" || event === "Push Hook")
    && branch === "refs/heads/master"){
    console.log("Pushed to master");

    runCommand();
  }

  res.sendStatus(200);
});

try {
  console.log(`PID: ${process.pid}`);
  fs.writeFileSync('app_pid.txt', process.pid);
} catch(err) {
  console.error(err);
}

index.listen(expressConf.port, () => console.log(`App listening on port ${expressConf.port}`));
