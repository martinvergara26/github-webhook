#Git events listener
###Express server that listens for git webhook events

If you didn't know, you can trigger request on git events.

For example, you can create an event for merges to master.


##Guide
1) Access to your server
2) Install this package `npm i git-events-listener`
3) Start the server: `node node_modules/git-events-listener/app.js`

####In Github
Go to https://github.com/<user>/<repo>/settings/hooks/new

Payload URL: there you have to put your server's ip and a port (9999)

E.g., http://3.88.226.110:9999/

####In Gitlab
TODO 