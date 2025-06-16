#!/bin/bash
cd /home/kavia/workspace/code-generation/ecocart-navigator-15451-b2610f55/ecocart_navigator
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

