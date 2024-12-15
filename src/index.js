// Libraries
const path = require('path');
const jetpack = require('fs-jetpack');
const fetch = require('wonderful-fetch');
const { template } = require('node-powertools');
const dotenv = require('dotenv').config();

// Main Function
function Main() {
  const self = this;
}

Main.prototype.prompt = function (options) {
  const self = this;

  return new Promise(async function(resolve, reject) {
    // Default options
    options = options || {};
    options.input = options.input || '';
    options.model = options.model || 'gpt-4o';
    options.log = typeof options.log === 'undefined' ? false : options.log;
    options.debug = typeof options.debug === 'undefined' ? false : options.debug;

    // Log
    // console.log('Processing:', options);

    // Check if process.env.OPENAI_API_KEY is set
    if (!process.env.OPENAI_API_KEY) {
      return reject(new Error('Error: OPENAI_API_KEY environment variable not set.'));
    }

    // Check that prompt is not empty
    if (!options.input) {
      return reject(new Error('Error: No input provided.'));
    }

    try {
      const base = path.join(options.debug ? '_debug' : '');

      // Log
      console.log('Getting instructions...');

      // If log is enabled, log the current directory that jetpack wil be writing to
      if (options.log) {
        console.log('Writing to:', base);
      }

      // Request instructions
      const instructions = await self.request(Object.assign({}, options, {
        prompt: 'instructions',
        response: 'json',
      }))

      // Log
      console.log('Preparing to run with the following instructions:');
      instructions.list.forEach((item, index) => {
        const truncatedArgs = (item.arguments || []).map(arg => {
          const truncated = arg.length > 100 ? arg.slice(0, 100) : arg;
          return truncated.replace(/\n/g, ' ');
        });
        console.log(`${index + 1}: ${item.command} => ${truncatedArgs.join(', ')}`);
      });

      // Promises
      const promises = [];

      // Loop through instructions
      instructions.list.forEach((item, index) => {
        if (item.command === 'write') {
          promises.push(
            self.request(Object.assign({}, options, {
              prompt: 'task',
              input: {
                command: 'write',
                arguments: item.arguments,
                summary: instructions.summary,
                original: options.input,
              },
              response: 'text',
            }))
            .then((response) => {
              const file = path.join(base, item.arguments[0]);

              if (options.log) {
                console.log(`Writing to (${file}): ${response}`);
              }

              // Write to file
              jetpack.write(file, response);

              // Return
              return response;
            })
          );
        }
      });

      // Wait
      await Promise.all(promises);

      // Log
      console.log('Done!');
    } catch (e) {
      return reject(new Error(`Error processing: ${e.message}`));
    }
  });
};

// Request Function
Main.prototype.request = function (options) {
  const self = this;

  return new Promise(async function(resolve, reject) {
    // Default options
    options = options || {};
    options.prompt = options.prompt || '';
    options.input = options.input || '';
    options.response = options.response || 'json';
    options.maxTokens = options.maxTokens || 1024 * 16;

    // Log
    // console.log('Request:', options);
    const response = options.response === 'json'
      ? { type: 'json_object' }
      : undefined;

    try {
      // Load prompt file
      const base = path.join(__dirname, 'prompts', options.prompt);
      const system = jetpack.read(path.join(base, 'system.md'));
      const user = jetpack.read(path.join(base, 'user.md'));

      const config = {
        method: 'post',
        response: 'json',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: {
          model: options.model,
          response_format: response,
          messages: [
            {
              role: 'system',
              content: template(system, { input: options.input }),
            },
            {
              role: 'user',
              content: template(user, { input: options.input }),
            },
          ],
          temperature: options.temperature,
          max_completion_tokens: options.maxTokens,
        }
      }

      // Log
      if (options.log) {
        console.log('Request', config.body.messages);
      }

      // Fetch
      fetch('https://api.openai.com/v1/chat/completions', config)
      .then(r => {
        const content = options.response === 'json'
          ? JSON.parse(r.choices[0].message.content)
          : r.choices[0].message.content;

        // Log
        if (options.log) {
          console.log('Response:', content);
        }

        // Check for error
        if (content.error) {
          return reject(new Error('Error requesting: ' + content.error));
        }

        // Resolve
        return resolve(content);
      })
    } catch (e) {
      return reject(new Error(`Error requesting: ${e.message}`));
    }
  });
};

module.exports = Main;
