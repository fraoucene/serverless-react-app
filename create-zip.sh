#!/bin/bash
for file in $1/*.js; do
    mkdir -p 'deploy/lambdas/zip/'
    echo "ziping $file..."
    name="$(basename -s .js $file)"
    zip "deploy/lambdas/zip/$name.zip" "deploy/lambdas/$name.js"
done