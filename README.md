AWS SNS to Slack-hook [![Build Status](https://travis-ci.org/keboola/AWS-SNS-To-Slack-hook.svg?branch=master)](https://travis-ci.org/keboola/AWS-SNS-To-Slack-hook)
===
Use AWS Lambda to forward message to Slack from AWS SNS.
Designed specially for Cloudwatch Alarms.

## Resources

 * https://medium.com/@AdamRNeary/a-gulp-workflow-for-amazon-lambda-61c2afd723b6
 * https://medium.com/@AdamRNeary/developing-and-testing-amazon-lambda-functions-e590fac85df4
 

## Development
 
 * Run `npm install`
 * Rreate Incoming Webhook in [Slack](https://slack.com/) and grab the webhook URL
 * Copy `config.env.sample` file to `.env` and paste webhook URL from previous step
 * Run `node test.js` Simulates AWS Lambda handler function execution, you should see test message in your Slack channel


## Build

Build is handled automatically on Travis and performs these steps:
 * Export `SLACK_HOOK_URL` from Travis Settings
 * Install dependencies and prepare `dist` package
 * Zip dist package
 * Update Lambda function code usin AWS SDK
