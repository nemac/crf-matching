#!/usr/bin/env node

/**
 * Helper script to manage Lambda function dependencies
 * Usage: node scripts/install-lambda-deps.js [function-name]
 * 
 * If no function name is provided, installs deps for all functions
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LAMBDA_DIR = path.join(__dirname, '../lambda');

function installDepsForFunction(functionDir) {
  const functionPath = path.join(LAMBDA_DIR, functionDir);
  const packageJsonPath = path.join(functionPath, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.log(`⏭️  Skipping ${functionDir} (no package.json)`);
    return;
  }

  console.log(`📦 Installing dependencies for ${functionDir}...`);
  try {
    execSync('npm install', {
      cwd: functionPath,
      stdio: 'inherit'
    });
    console.log(`✅ ${functionDir} dependencies installed`);
  } catch (error) {
    console.error(`❌ Failed to install dependencies for ${functionDir}`);
    process.exit(1);
  }
}

function main() {
  const targetFunction = process.argv[2];

  if (targetFunction) {
    // Install for specific function
    const functionPath = path.join(LAMBDA_DIR, targetFunction);
    if (!fs.existsSync(functionPath)) {
      console.error(`❌ Function directory not found: ${targetFunction}`);
      process.exit(1);
    }
    installDepsForFunction(targetFunction);
  } else {
    // Install for all functions
    console.log('📦 Installing dependencies for all Lambda functions...\n');
    const functions = fs.readdirSync(LAMBDA_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    if (functions.length === 0) {
      console.log('No Lambda functions found in lambda/ directory');
      return;
    }

    functions.forEach(func => {
      installDepsForFunction(func);
      console.log('');
    });

    console.log('✅ All dependencies installed!');
  }
}

main();