var SnsToSlack  = require('./index');

var sampleEvents = [{
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
},
{
  "Records": [{
    "EventSource": "aws:sns",
    "EventVersion": "1.0",
    "EventSubscriptionArn": "arn:aws:sns:us-east-1:147946154733:Martin-lambda-test:167e76f7-39b4-4c38-985f-d0aa17aa3ca9",
    "Sns": {
        Type: 'Notification',
        MessageId: 'b87f8e39-bd63-54f5-97e1-c02992db5d26',
        TopicArn: 'arn:aws:sns:us-east-1:147946154733:KBC_RDS_support',
        Subject: '[Amazon Redshift INFO] - Maintenance Completed',
        Message: '{"Event Source":"cluster","Resource":"sapi-14-firehouse","Event Time":"2015-07-03 06:36:08.053","Identifier Link":"https://console.aws.amazon.com/redshift/home?region=us-east-1#cluster-details:cluster=sapi-14-firehouse ","Severity":"INFO","Category":["Management"],"About this Event":"http://docs.aws.amazon.com/redshift/latest/mgmt/working-with-event-notifications.html#REDSHIFT-EVENT-2004 ","Event Message":"Maintenance on Amazon Redshift cluster \'sapi-14-firehouse\' completed at 2015-07-03 06:36 UTC."}', Timestamp: '2015-07-03T06:36:40.356Z', SignatureVersion: '1', Signature: 'jvjrWIn5vGEZN7m25+GW+r580u/H2dhO3v8Fc1tJpLPdrY8J9psFdkWrM/xvLKkPPr7tKpV4PMux5cbL76OYJkV5x+PPT9fPiXZlqTn53tUzNffCAQcBHIS654tUET10RJ+Nlcf4nFOAB/3ZFyHNaXjvyb1euUMvr0y8R7wdc9FxAB8VPNwnE5qkfNa3tyvM4SnYORKpeypV+uQkau7aO6DhmfMsU1k2qUGgyxM9S3nl8F1i4+kEuZhoj9mwPIZv0dkO4UbZyDmx1KHZsiUDTDp4t1l2Fvg0mS840iC0xzgEiPICRoRUANj4noZukTrfsso1nDgHZUVztPfI9fMZSg==', SigningCertUrl: 'https://sns.us-east-1.amazonaws.com/SimpleNotificationService-d6d679a1d18e95c2f9ffcf11f4f9e198.pem', UnsubscribeUrl: 'https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:147946154733:KBC_RDS_support:c6ab9f7e-a1df-4e26-a1aa-6e74ab37902a',
        MessageAttributes: {}
    }
  }
  ]
}
];

// This object is boilerplate for the context passed to an Amazon Lambda
// function. Calling done() exits the process Lambda creates.
var context = {
  done: function(error, message) {
    console.log('done!');
  }
};

sampleEvents.forEach(function(event) {
  SnsToSlack.handler(event, context);
});
