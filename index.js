console.log('Loading function');
require('dotenv').load();
var async = require('async');

console.log('start', process.env);

// Extract data from the kinesis event
// to get the slack hook url, go into slack admin and create a new "Incoming Webhook" integration
const https = require('https');
const url = require('url');
const slack_url = process.env.SLACK_HOOK_URL;

const slack_req_opts = url.parse(slack_url);
const app_name = 'AWS Cloudwatch';
slack_req_opts.method = 'POST';
slack_req_opts.headers = {'Content-Type': 'application/json'};

console.log('loaded');

exports.handler = function(event, context) {

  console.log('handler');
  function handlePayload(record, callback) {
    handleData(record.Sns, callback);
  }

  async.eachSeries(event.Records, handlePayload, context.done)
};


function handleData(Sns, callback) {
  console.log('handleData', slack_req_opts);
  var req = https.request(slack_req_opts, function (res) {
    if (res.statusCode === 200) {
      callback(null, 'posted to slack');
    } else {
      callback('status code: ' + res.statusCode);
    }
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    callback(e.message);
  });

  var payload = {
    username: app_name,
    icon_url: 'https://d3iz2gfan5zufq.cloudfront.net/images/cloud-services/cloudsearch32-1.png',
    text: '',
    mrkdwn: true
  };
  try {
    const message = JSON.parse(Sns.Message);
    var attachment = {
        fallback: Sns.Subject,
        pretext: Sns.Subject,
        color: 'danger',
        mrkdwn_in: [
          "text"
        ]
      };

    if (message.AlarmName){
      var attachmentMarkdownLines = [];

      attachmentMarkdownLines.push('*Alarm Name*');
      attachmentMarkdownLines.push(message.AlarmName);

      attachmentMarkdownLines.push('');
      attachmentMarkdownLines.push('*New State Reason*');
      attachmentMarkdownLines.push(message.NewStateReason);

      attachmentMarkdownLines.push('');
      attachmentMarkdownLines.push('*Trigger*');
      attachmentMarkdownLines.push(JSON.stringify(message.Trigger, null, 2));
      attachment.text = attachmentMarkdownLines.join('\n');
    }


    payload.attachments = [attachment];
  }
  catch (err) {
    // not json
    payload.text = Sns.Message
  }

  req.write(
    JSON.stringify(payload)
  );

  req.end();
}
