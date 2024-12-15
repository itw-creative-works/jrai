<p align="center">
  <a href="https://itwcreativeworks.com">
    <!-- <img src="https://cdn.itwcreativeworks.com/assets/jrai/images/logo/jrai-brandmark-black-x.svg" width="100px"> -->
    <img src="https://cdn.itwcreativeworks.com/assets/itw-creative-works/images/logo/itw-creative-works-brandmark-black-x.svg" width="100px">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/package-json/v/itw-creative-works/jrai.svg">
  <br>
  <img src="https://img.shields.io/librariesio/release/npm/jrai.svg">
  <img src="https://img.shields.io/bundlephobia/min/jrai.svg">
  <img src="https://img.shields.io/codeclimate/maintainability-percentage/itw-creative-works/jrai.svg">
  <img src="https://img.shields.io/npm/dm/jrai.svg">
  <img src="https://img.shields.io/node/v/jrai.svg">
  <img src="https://img.shields.io/website/https/itwcreativeworks.com.svg">
  <img src="https://img.shields.io/github/license/itw-creative-works/jrai.svg">
  <img src="https://img.shields.io/github/contributors/itw-creative-works/jrai.svg">
  <img src="https://img.shields.io/github/last-commit/itw-creative-works/jrai.svg">
  <br>
  <br>
  <a href="https://itwcreativeworks.com">Site</a> | <a href="https://www.npmjs.com/package/jrai">NPM Module</a> | <a href="https://github.com/itw-creative-works/jrai">GitHub Repo</a>
  <br>
  <br>
  <strong>jrai</strong> is the official npm module of <a href="https://itwcreativeworks.com?ref=jrai">Jr. AI</a>, a free app for Create an entire project with just a single prompt.
</p>

## 🌐 Jr. AI Works in Node AND command line!
Yes, this module works in both Node and the command line! You can use it in your Node projects or in the command line.

## 🦄 Features
* Create an entire project with just a single prompt

<!-- ## 🔑 Getting an API key
You can use so much of `jrai` for free, but if you want to do some advanced stuff, you'll need an API key. You can get one by [signing up for a Jr. AI account](https://itwcreativeworks.com/signup). -->

## 📦 Install Jr. AI
### Option 1: Install via npm
Install with npm if you plan to use `jrai` in a Node project or in the browser.
```shell
npm install jrai -g
```
<!-- If you plan to use `jrai` in a browser environment, you will probably need to use [Webpack](https://www.npmjs.com/package/webpack), [Browserify](https://www.npmjs.com/package/browserify), or a similar service to compile it. -->

<!-- ```js
const jrai = new (require('jrai'))({
  // Not required, but having one removes limits (get your key at https://itwcreativeworks.com).
  apiKey: 'api_test_key'
});
``` -->

## ⚡️ Usage
<!-- ### jrai.run(options)
```js
jrai.run(options);
``` -->
### jrai prompt
You can now use the `jrai` command in the command line to create an entire project with just a single prompt.
```shell
jrai prompt
```
After you provide your request, `jrai` will create the project for you.

If you wanted to make an NPM module, your project structure might look like this:
```text
/
├── package.json
├── README.md
└── index.js
```

#### Options
* `--input` - The input you want to provide to Jr. AI (default: `<empty>`)
* `--model` - The model you want to use (default: `gpt-4o`)
* `--multiline` - Enable multiline input (default: `false`)
* `--log` - Log the output to the console (default: `false`)
* `--debug` - Write to `_debug` file (default: `false`)

## 📘 Using Jr. AI
After you have followed the install step, you can start using `jrai` to enhance your project.

For a more in-depth documentation of this library and the Jr. AI service, please visit the official Jr. AI website.

## 📝 What Can Jr. AI do?
An AI assistant that can create an entire project for you with just a single prompt

## 🗨️ Final Words
If you are still having difficulty, we would love for you to post
a question to [the Jr. AI issues page](https://github.com/itw-creative-works/jrai/issues). It is much easier to answer questions that include your code and relevant files! So if you can provide them, we'd be extremely grateful (and more likely to help you find the answer!)

## 📚 Projects Using this Library
* [ITW Creative Works](https://itwcreativeworks.com)
* [Somiibo](https://somiibo.com)
* [Slapform](https://slapform.com)
* [StudyMonkey](https://studymonkey.ai)
* [DashQR](https://dashqr.com)
* [Replyify](https://replyify.app)
* [SoundGrail](https://soundgrail.com)
* [Trusteroo](https://trusteroo.com)

Ask us to have your project listed! :)
