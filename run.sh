#!/usr/bin/env bash

docker run -ti -p 8000:8000 -v $PWD:/app -w /app node:10.19.0-alpine3.9 npm install

docker run -ti -p 8000:8000 -v $PWD:/app -w /app --rm node:10.19.0-alpine3.9 npm start
