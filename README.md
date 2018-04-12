[discord.js]: https://www.npmjs.com/package/discord.js

# discord-routes

*Easily create [discord.js] bot commands with Express like routing capabilites.*

## About

discord-routes is a Node.js library to simplify implementation of bot commands powered by [discord.js].

It allows the implementation of commands similarly to setting up routes with Express.

## Installation

This supports all recent-ish versions of Node.js.

In your project run `npm install --save discord-routes`.

## Usage

A simple example:

```js
var Discord = require('discord.js');
var client = new Discord.Client();
var CommandSet = require('discord-routes').CommandSet;
var commands = new CommandSet(client, '!bot');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// responds to '!bot ping' with 'Pong!'
commands.set('ping', req => {
  req.reply('Pong!');
});

// binds to message event listener
commands.listen();

client.login('token');
```

A slightly more complex example:

```js
var Discord = require('discord.js');
var client = new Discord.Client();
var CommandSet = require('discord-routes').CommandSet;
var commands = new CommandSet(client, '!bot');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// responds to all unrecognized paths with a simple help message
commands.set('', req => {
  req.reply('Try \'!bot ping\'!');
});

// responds to '!bot ping' with 'Pong!'
commands.set('ping', req => {
  req.reply('Pong!');
});

// classic echo command invoked by '!bot echo <text>'
commands.set('echo', (req, args) => {
  req.reply(args.join(' '));
});

// unsets a command
// calling '!bot delete command echo' will unset the echo command
commands.set('delete command', (req, args) => {
  if (!args.length) {
    req.reply('What should I delete?');
    return;
  }
  commands.unset(args.join(' '));
});

// hello world
// '!bot hello world arg1 arg2' should reply with 'arg1 arg2'
commands.set('hello world', (req, args) => {
  req.reply('Hello world! You gave me these arguments: ' + args.join(' '));
});

// binds to message event listener
commands.listen();

client.login('token');
```
