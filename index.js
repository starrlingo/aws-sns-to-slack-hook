console.log('Loading function');
require('dotenv').load();

const https = require('https');
const url = require('url');
// to get the slack hook url, go into slack admin and create a new "Incoming Webhook" integration
const slack_url = process.env.SLACK_HOOK_URL
const slack_req_opts = url.parse(slack_url);
const app_name = 'AWS Cloudwatch';
slack_req_opts.method = 'POST';
slack_req_opts.headers = {'Content-Type': 'application/json'};

exports.handler = function(event, context) {
  console.log(JSON.stringify(event, null, 2));
  console.log('From SNS:', event.Records[0].Sns.Message);
  (event.Records || []).forEach(function (rec) {
    if (rec.Sns) {
      var req = https.request(slack_req_opts, function (res) {
        if (res.statusCode === 200) {
          context.succeed('posted to slack');
        } else {
          context.fail('status code: ' + res.statusCode);
        }
      });

      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        context.fail(e.message);
      });

      var text = '';
      try {
        const message = JSON.parse(rec.Sns.Message);
        text = JSON.stringify(message, null, 4)
      }
      catch (err) {
        // not json
        text = rec.Sns.Message
      }


      req.write(
          JSON.stringify(
              {
                text: text,
                username: app_name
              }
          )
      );

      req.end();
    }
  });
};
