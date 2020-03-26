const exec = require('child_process').exec;
const fs = require('fs');

const cb = (error) => {
  if(error){
    console.log("Error ", error);
  }
};

const pidToKill = fs.readFileSync('app_pid.txt', 'utf8');
const command = `kill -9 ${pidToKill}`;

const deployProcess = exec(command, {}, cb);

deployProcess.stdout.on('data', function (data) {
  console.log(data);
});

deployProcess.stderr.on('data', (data) => {
  console.error(data);
});