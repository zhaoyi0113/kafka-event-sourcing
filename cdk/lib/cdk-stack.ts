import { Stack, StackProps, CfnOutput, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaPath = path.join(__dirname, '../../');

    Tags.of(this).add('COMPONENT_NAME', 'test');
    Tags.of(this).add('STAGE', 'dev');

    const fn = new lambda.Function(this, 'streamHandler', {
      runtime: lambda.Runtime.GO_1_X,
      handler: 'main',
      code: lambda.Code.fromAsset(lambdaPath, {
        bundling: {
          image: lambda.Runtime.GO_1_X.bundlingImage,
          user: "root",
          environment: {
            CGO_ENABLED: '0',
            GOOS: 'linux',
            GOARCH: 'amd64',
          },
          command: [
            'bash', '-c', [
              'ls',
              'make build',
            ].join(' && ')
          ]
        },
      }),
    });
  }
}
