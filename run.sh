#!/usr/bin/env bash

docker run -ti -p 9999:9999 -v $PWD:/app -w /app node:8 npm install

docker run -ti -p 9999:9999 -v $PWD:/app -w /app --rm node:8 npm start
