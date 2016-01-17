#!/bin/bash
aws lambda invoke \
--invocation-type Event \
--function-name ipmlambda \
--log-type Tail \
--region ap-northeast-1 outputfile.txt
