#!/bin/bash
aws lambda create-function \
--function-name ipmlambda \
--zip-file fileb://./dist/ipmlambda.zip \
--role YOUR_ROLE \
--handler index.handler \
--runtime nodejs \
--region ap-northeast-1
