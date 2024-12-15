const inquirer = require('@inquirer/prompts');

module.exports = async function (options) {
  console.log(`Welcome to Jr.AI v{version}! Please provide some information to get started.`);

  // Log
  // console.log('Options:', options);

  try {
    // Collect answers using the new @inquirer/prompts methods
    const input = await inquirer.input({
      message: 'What would you like to make today?',
      default: options.input,
    });
    const model = await inquirer.input({
      message: 'What AI model are we using?',
      default: 'gpt-4o',
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
    });
  } catch (e) {
    console.error(`Error during the prompt: ${e.message}`);
  }
};
