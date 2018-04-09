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

A more slightly more complex example:
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

// classic echo command invoked by '!bot echo <text>'
commands.set('echo', (req, args) => {
  req.reply(args.join(' '));
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
