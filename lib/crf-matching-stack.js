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
    // Lambda Function: Verify Magic Link
    // (Add when you create this function)
    // ========================================
    // const verifyMagicLinkFunction = new lambda.Function(
    //   this,
    //   'VerifyMagicLinkFunction',
    //   {
    //     functionName: 'crf-matching-verify-magic-link',
    //     runtime: lambda.Runtime.NODEJS_24_X,
    //     handler: 'index.handler',
    //     code: lambda.Code.fromAsset(join(__dirname, '../lambda/verify-magic-link')),
    //     role: magicLinkRole, // Or create a separate role
    //     timeout: cdk.Duration.seconds(10),
    //     memorySize: 128,
    //     environment: commonEnvironment,
    //     architecture: lambda.Architecture.X86_64,
    //     description: 'Verifies magic link tokens and retrieves organization data',
    //   }
    // );

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

    // ========================================
    // Outputs
    // ========================================
    new cdk.CfnOutput(this, 'GenerateMagicLinkFunctionArn', {
      value: generateMagicLinkFunction.functionArn,
      description: 'ARN of the generate magic link function',
    });

    new cdk.CfnOutput(this, 'UpdateOrganizationFunctionArn', {
      value: updateOrganizationFunction.functionArn,
      description: 'ARN of the update organization function',
    });

    // Add more outputs as you add functions
    // new cdk.CfnOutput(this, 'VerifyMagicLinkFunctionArn', {
    //   value: verifyMagicLinkFunction.functionArn,
    //   description: 'ARN of the verify magic link function',
    // });
  }
}