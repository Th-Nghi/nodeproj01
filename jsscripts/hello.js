#!/usr/bin/env node

// Simple Node.js example script.

const os = require('os');

function main() {
  console.log('Hello from Node.js!');
  console.log(`Platform: ${os.type()} ${os.release()}`);
  console.log(`Node version: ${process.version}`);
  console.log(`Home directory: ${os.homedir()}`);
  console.log(`Current time: ${new Date().toISOString()}`);
}

main();
