console.log('Loading function');
require('dotenv').load();
var async = require('async');


// Extract data from the kinesis event
// to get the slack hook url, go into slack admin and create a new "Incoming Webhook" integration
const https = require('https');
const url = require('url');
const slack_url = process.env.SLACK_HOOK_URL;
const slack_req_opts = url.parse(slack_url);
const app_name = 'AWS Cloudwatch';
slack_req_opts.method = 'POST';
slack_req_opts.headers = {'Content-Type': 'application/json'};

exports.handler = function(event, context) {

  function handlePayload(record, callback) {
    handleData(record.Sns, callback);
  }

  async.eachSeries(event.Records, handlePayload, context.done)
};


function handleData(Sns, callback) {
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
    icon_url: 'https://d3iz2gfan5zufq.cloudfront.net/images/cloud-services/cloudsearch32-1.png'
  };
  try {
    const message = JSON.parse(Sns.Message);
    var text = Sns.Subject,
      attachment = {
        fallback: Sns.Subject,
        pretext: Sns.Subject,
        color: 'danger',
        fields: []
      };

    if (message.AlarmName){
      attachment.fields.push({
        title: 'Alarm Name',
        value: message.AlarmName
      });
      attachment.fields.push({
        title: 'New State Reason',
        value: message.NewStateReason
      });
      attachment.fields.push({
        title: 'Trigger',
        value: JSON.stringify(message.Trigger, null, 2),
        short: false
      })
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
