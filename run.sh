#!/usr/bin/env bash

docker network rm github_webhook

docker run -ti -p 9999:9999 --env-file .env --network github_webhook -v $HOME:/app -w /app/webhook-server --rm node:10.19.0-alpine3.9 npm start
