console.log('Loading function');

const https = require('https');
const url = require('url');
// to get the slack hook url, go into slack admin and create a new "Incoming Webhook" integration
const slack_url = 'https://hooks.slack.com/services/..../..../.....';  //fill the slack webhook url here
const slack_req_opts = url.parse(slack_url);
slack_req_opts.method = 'POST';
slack_req_opts.headers = {'Content-Type': 'application/json'};

exports.handler = function(event, context) {
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
      
      try {
          // if message format is JSON
          req.write(
              JSON.stringify(
                  {text:JSON.stringify(JSON.parse(rec.Sns.Message), null, 4)}
              )
          );
      }
      catch(err) {
          // if message format is not JSON
          req.write(
              JSON.stringify(
                  {text:rec.Sns.Message}
              )              
          );
      }      
      req.end();
    }
  });
};
