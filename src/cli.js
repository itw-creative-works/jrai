// Libraries
const path = require('path');
const jetpack = require('fs-jetpack');

// Command Aliases
const commandAliases = {
  prompt: ['-p', 'p', 'ask'],
  version: ['-v', '--version'],
};

// Function to resolve command name from aliases
function resolveCommand(command) {
  for (const [key, aliases] of Object.entries(commandAliases)) {
    if (command === key || aliases.includes(command)) {
      return key;
    }
  }
  return command; // Default to original command if no alias is found
}

// Main Function
function Main() {}

Main.prototype.process = async function (options) {
  // Determine the command (default to "prompt" if none provided)
  const inputCommand = options._[0] || 'prompt';
  const command = resolveCommand(inputCommand);

  try {
    // Get the command file path
    const commandFile = path.join(__dirname, 'commands', `${command}.js`);

    // Check if the command file exists
    if (!jetpack.exists(commandFile)) {
      throw new Error(`Error: Command "${command}" not found.`);
    }

    // Execute the command
    const Command = require(commandFile);
    await Command(options);
  } catch (e) {
    console.error(`Error executing command "${command}": ${e.message}`);

    // Exit with error
    throw e;
  }
};

module.exports = Main;
