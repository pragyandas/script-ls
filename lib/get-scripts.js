const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const getScripts = async () => {
  let json;

  try {
    const cwd = process.cwd();
    json = await readFile(`${cwd}/package.json`);
  } catch (_) {
    throw new Error('No package.json found.');
  }

  const packageDefinition = JSON.parse(json);
  const {scripts} = packageDefinition;
  let scriptNames = scripts && Object.keys(scripts);

  if (!scriptNames) {
    throw new Error('No scripts found in package.json');
  }

  return scriptNames;
};

module.exports = getScripts;