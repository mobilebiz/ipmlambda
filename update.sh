#!/bin/bash
aws lambda update-function-code \
--function-name ipmlambda \
--zip-file fileb://./dist/ipmlambda.zip \
--region ap-northeast-1
