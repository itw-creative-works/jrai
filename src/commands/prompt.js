const inquirer = require('@inquirer/prompts');
const package = require('../../package.json');

module.exports = async function (options) {
  console.log(`Welcome to Jr.AI v${package.version}! Please provide some information to get started.`);

  // Log
  // console.log('Options:', options);

  try {
    // Collect answers using the new @inquirer/prompts methods
    const input = await ask({
      message: 'What would you like to make today?',
      default: undefined,
      value: options.input,
      multiline: options.multiline,
    });
    const model = await ask({
      message: 'What AI model are we using?',
      default: 'gpt-4o',
      value: options.model,
    });
    // const language = await list({
    //   message: 'What is your favorite programming language?',
    //   choices: ['JavaScript', 'Python', 'Java', 'C#', 'Other'],
    // });
    // const isConfirmed = await confirm({
    //   message: 'Is this information correct?',
    //   default: true,
    // });

    // Handle the responses
    const processor = new (require('../index.js'))();

    // Process it!
    await processor.prompt({
      input: input,
      model: model,
      ...options
    });
  } catch (e) {
    console.error(`Error during the prompt: ${e.message}`);
  }
};

function ask(options) {
  options = options || {};

  // If a value is provided, return it
  if (typeof options.value !== 'undefined') {
    return options.value;
  }

  // Check if multuiline is enabled
  if (typeof options.multiline !== 'undefined') {
    return inquirer.editor({
      message: options.message,
      default: options.default,
    });
  }

  return inquirer.input({
    message: options.message,
    default: options.default,
  });
}
