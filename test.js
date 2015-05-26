var SnsToSlack  = require('./index');

var sampleEvent = {
  "Records": [
    {
      "EventSource": "aws:sns",
      "EventVersion": "1.0",
      "EventSubscriptionArn": "arn:aws:sns:us-east-1:147946154733:Martin-lambda-test:167e76f7-39b4-4c38-985f-d0aa17aa3ca9",
      "Sns": {
        "Type": "Notification",
        "MessageId": "33e80a51-6e86-54a8-996a-478f495096df",
        "TopicArn": "arn:aws:sns:us-east-1:147946154733:Martin-lambda-test",
        "Subject": "ALARM: \"martin-test\" in US - N. Virginia",
        "Message": "{\"AlarmName\":\"martin-test\",\"AlarmDescription\":null,\"AWSAccountId\":\"147946154733\",\"NewStateValue\":\"ALARM\",\"NewStateReason\":\"Threshold Crossed: 1 datapoint (41.324462890625) was greater than or equal to the threshold (10.0).\",\"StateChangeTime\":\"2015-05-26T07:49:42.541+0000\",\"Region\":\"US - N. Virginia\",\"OldStateValue\":\"OK\",\"Trigger\":{\"MetricName\":\"PercentageDiskSpaceUsed\",\"Namespace\":\"AWS/Redshift\",\"Statistic\":\"AVERAGE\",\"Unit\":null,\"Dimensions\":[{\"name\":\"ClusterIdentifier\",\"value\":\"sapi-03-seznam\"}],\"Period\":300,\"EvaluationPeriods\":1,\"ComparisonOperator\":\"GreaterThanOrEqualToThreshold\",\"Threshold\":10.0}}",
        "Timestamp": "2015-05-26T07:49:42.590Z",
        "SignatureVersion": "1",
        "Signature": "TQ1kltXFETutjVMkD5tXG0gGnKqz71I3Idbt7nZJPPpvSDvOnJTtBKRa6m7Y7OCPWWHcN5mz+1O1TcCJkIEcTCXzuZp2Pilb5y6U47LXLHbd4KK6hLoIG2KD+L2KeFYFquXzODqaxtp+HVyBtlhYkaqmEG5TpNLWnH0jRGxzGX0UF6Bm0/0PuHIUwYFBArLIfxMUWUsYnUAeOKUD/Gix0EWvzN2SsWDNacfRgOvr4+i8gPRgmmUu/NN5Rah11h5BNxFWv/ZZ8y+Cta3PYPjInSkQxnmxL9J5YzkNvlijzf6rV0gdcFuUixpNugtcGDtFm/6Qtur7GmOwuISXaybC3g==",
        "SigningCertUrl": "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-d6d679a1d18e95c2f9ffcf11f4f9e198.pem",
        "UnsubscribeUrl": "https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:147946154733:Martin-lambda-test:167e76f7-39b4-4c38-985f-d0aa17aa3ca9",
        "MessageAttributes": {}
      }
    }
  ]
};

// This object is boilerplate for the context passed to an Amazon Lambda
// function. Calling done() exits the process Lambda creates.
var context = {
  done: function(error, message) {
    console.log('done!');
    process.exit(1);
  }
};


SnsToSlack.handler(sampleEvent, context);