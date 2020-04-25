const fuzzy = require('fuzzy');
const inquirer = require('inquirer');
const autoCompletePrompt = require('inquirer-autocomplete-prompt');

inquirer.registerPrompt('autocomplete', autoCompletePrompt);

const inquireScript = async (scripts) => {
  const answer = await inquirer
  .prompt([
    {
      type: 'autocomplete',
      name: 'script',
      message: 'Search script: ',
      source: makeSearchScripts(scripts),
    }
  ]);

  return answer;
}

function makeSearchScripts (scripts) {
  return (_, input) => {
    input = input || '';
    return new Promise(function(resolve) {
      setTimeout(function() {
        const fuzzyResult = fuzzy.filter(input, scripts);
        const result = fuzzyResult.map((el) => el.original);
        resolve(result);
      }, 0);
    });
  }
}

module.exports = inquireScript;
