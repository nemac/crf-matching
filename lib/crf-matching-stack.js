import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class CrfMatchingStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Common environment variables that multiple functions might share
    const commonEnvironment = {
      DYNAMODB_TABLE: 'crf-matching-magic-links',
      SECRET_ARN: 'arn:aws:secretsmanager:us-east-1:104538610210:secret:crf-matching/airtable-HMQYZZ',
      SES_SENDER_EMAIL: 'admin@nemac.org',
      FRONTEND_URL: 'https://crf-matching-dev.nemac.org',
    };

    // Import the existing IAM role
    const magicLinkRole = iam.Role.fromRoleArn(
      this,
      'MagicLinkRole',
      'arn:aws:iam::104538610210:role/crf-matching-lambda-magic-link-role'
    );

    // ========================================
    // Lambda Function: Generate Magic Link
    // ========================================
    const generateMagicLinkFunction = new lambda.Function(
      this,
      'GenerateMagicLinkFunction',
      {
        functionName: 'crf-matching-generate-magic-link',
        runtime: lambda.Runtime.NODEJS_24_X,
        handler: 'index.handler',
        code: lambda.Code.fromAsset(join(__dirname, '../lambda/generate-magic-link')),
        role: magicLinkRole,
        timeout: cdk.Duration.seconds(30),
        memorySize: 256,
        environment: commonEnvironment,
        architecture: lambda.Architecture.X86_64,
        description: 'Generates secure magic links for organization data updates',
      }
    );

    // ========================================
    // Lambda Function: Validate Token
    // ========================================
    const validateTokenFunction = new lambda.Function(
      this,
      'ValidateTokenFunction',
      {
        functionName: 'crf-matching-validate-token',
        runtime: lambda.Runtime.NODEJS_24_X,
        handler: 'index.handler',
        code: lambda.Code.fromAsset(join(__dirname, '../lambda/matching-validate-token')),
        role: magicLinkRole,
        timeout: cdk.Duration.seconds(10),
        memorySize: 128,
        environment: commonEnvironment,
        architecture: lambda.Architecture.X86_64,
        description: 'Validates magic link tokens and retrieves organization data from Airtable',
      }
    );

    // ========================================
    // Lambda Function: Update Organization
    // ========================================
    const updateOrganizationFunction = new lambda.Function(
      this,
      'UpdateOrganizationFunction',
      {
        functionName: 'crf-matching-update-organization',
        runtime: lambda.Runtime.NODEJS_24_X,
        handler: 'index.handler',
        code: lambda.Code.fromAsset(join(__dirname, '../lambda/matching-update-organization')),
        role: magicLinkRole,
        timeout: cdk.Duration.seconds(30),
        memorySize: 256,
        environment: commonEnvironment,
        architecture: lambda.Architecture.X86_64,
        description: 'Updates organization data in Airtable',
      }
    );

    const githubOidcProvider = iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
      this,
      'GitHubOidcProvider',
      'arn:aws:iam::104538610210:oidc-provider/token.actions.githubusercontent.com'
    );

    const githubActionsRole = new iam.Role(this, 'GitHubActionsRole', {
      roleName: 'crf-matching-github-actions-role',
      description: 'OIDC role for GitHub Actions to manage SSM AGOL key and deploy to S3/CloudFront',
      assumedBy: new iam.WebIdentityPrincipal(githubOidcProvider.openIdConnectProviderArn, {
        StringEquals: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
        },
        StringLike: {
          'token.actions.githubusercontent.com:sub': [
            'repo:nemac/crf-matching:ref:refs/heads/master',
            'repo:nemac/crf-matching:ref:refs/heads/develop',
          ],
        },
      }),
    });

    githubActionsRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['ssm:GetParameter', 'ssm:GetParameters', 'ssm:PutParameter'],
        resources: ['arn:aws:ssm:us-east-1:104538610210:parameter/crf-matching/*'],
      })
    );

    githubActionsRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['s3:ListBucket', 's3:GetObject', 's3:PutObject', 's3:DeleteObject'],
        resources: [
          'arn:aws:s3:::crf-matching',
          'arn:aws:s3:::crf-matching/*',
          'arn:aws:s3:::crf-matching-dev',
          'arn:aws:s3:::crf-matching-dev/*',
        ],
      })
    );

    githubActionsRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['cloudfront:CreateInvalidation'],
        resources: [
          'arn:aws:cloudfront::104538610210:distribution/E6AN64MGEH6XD',
          'arn:aws:cloudfront::104538610210:distribution/E3LE6G8XQS44Y4',
          'arn:aws:cloudfront::104538610210:distribution/E35676Q3CH6Y85',
          'arn:aws:cloudfront::104538610210:distribution/E2NM5QT3AUD8LF',
        ],
      })
    );

    // ========================================
    // Outputs
    // ========================================
    new cdk.CfnOutput(this, 'GenerateMagicLinkFunctionArn', {
      value: generateMagicLinkFunction.functionArn,
      description: 'ARN of the generate magic link function',
    });

    new cdk.CfnOutput(this, 'ValidateTokenFunctionArn', {
      value: validateTokenFunction.functionArn,
      description: 'ARN of the validate token function',
    });

    new cdk.CfnOutput(this, 'UpdateOrganizationFunctionArn', {
      value: updateOrganizationFunction.functionArn,
      description: 'ARN of the update organization function',
    });

    new cdk.CfnOutput(this, 'GitHubActionsRoleArn', {
      value: githubActionsRole.roleArn,
      description: 'ARN of the GitHub Actions OIDC IAM role',
    });
  }
}