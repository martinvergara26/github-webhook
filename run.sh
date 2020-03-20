#!/usr/bin/env bash

docker run -ti -p 9999:9999 -v $HOME:/app -w /app/webhook-server \
  -e GB_WEBHOOK_SECRET=$GB_WEBHOOK_SECRET \
  -e DEPLOY_PATH=$DEPLOY_PATH \
  -e DEPLOY_COMMAND=$DEPLOY_COMMAND \
  --rm node:10.19.0-alpine3.9 npm start \
  /
