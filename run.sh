#!/usr/bin/env bash

docker run -ti -p 9999:9999 -v $HOME:/app -w /app --rm node:10.19.0-alpine3.9 npm install

docker run -ti -p 9999:9999 -v $HOME:/app -w /app --rm node:10.19.0-alpine3.9 npm start
