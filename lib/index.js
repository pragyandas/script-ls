#!/usr/bin/env node

const npm = require('npm');
const getScripts = require('./get-scripts');
const inquireScript = require('./inquire-script');

const start = async () => {
  try {
    const scripts = await getScripts();
    const {script}  = await inquireScript(scripts);
    run(script);
  } catch (error) {
    console.error(error.message);
    return;
  }
}

start();

function run (script) {
  npm.load(() => npm.run(script));
}