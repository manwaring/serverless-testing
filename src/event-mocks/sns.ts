import { SNSEvent, SNSEventRecord } from 'aws-lambda';
import { all } from 'deepmerge';

export function snsEvent(override: NestedPartial<SNSEvent> = {}): SNSEvent {
  const Records = override.Records
    ? all([defaultRecords, override.Records], { arrayMerge: combineMerge })
    : defaultRecords;
  return <SNSEvent>{ Records };
}

function combineMerge(target, source, options) {
  const destination = target.slice();
  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = all([target[index], item], options);
    }
  });
  return destination;
}

const defaultRecords: SNSEventRecord[] = [
  {
    EventSource: 'aws:sns',
    EventVersion: '1.0',
    EventSubscriptionArn:
      'arn:aws:sns:us-east-1:123456789:service-1474781718017-1:fdaa4474-f0ff-4777-b1c4-79b96f5a504f',
    Sns: {
      Type: 'Notification',
      MessageId: '52ed5e3d-5fgf-56bf-923d-0e5c3b503c2a',
      TopicArn: 'arn:aws:sns:us-east-1:123456789:service-1474781718017-1',
      Subject: '',
      Message: 'hello world',
      Timestamp: '2016-09-25T05:37:51.150Z',
      SignatureVersion: '1',
      Signature:
        'V5QL/dhow62Thr9PXYsoHA7bOsDFkLdWZVd8D6LyptA6mrq0Mvldvj/XNtai3VaPp84G3bD2nQbiuwYbYpu9u9uHZ3PFMAxIcugV0dkOGWmYgKxSjPApItIoAgZyeH0HzcXHPEUXXO5dVT987jZ4eelD4hYLqBwgulSsECO9UDCdCS0frexiBHRGoLbWpX+2Nf2AJAL+olEEAAgxfiPEJ6J1ArzfvTFZXdd4XLAbrQe+4OeYD2dw39GBzGXQZemWDKf4d52kk+SwXY1ngaR4UfExQ10lDpKyfBVkSwroaq0pzbWFaxT2xrKIr4sk2s78BsPk0NBi55xA4k1E4tr9Pg==',
      SigningCertUrl:
        'https://sns.us-east-1.amazonaws.com/SimpleNotificationService-b95095beb82e8f6a0e6b3aafc7f4149a.pem',
      UnsubscribeUrl:
        'https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:123456789:service-1474781718017-1:fdaa4474-f0ff-4777-b1c4-79b96f5a504f',
      MessageAttributes: {}
    }
  }
];
