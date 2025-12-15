#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CrfMatchingStack } from '../lib/crf-matching-stack.js';

const app = new cdk.App();

new CrfMatchingStack(app, 'CrfMatchingStack', {
  env: {
    account: '104538610210',
    region: 'us-east-1',
  },
});

app.synth();