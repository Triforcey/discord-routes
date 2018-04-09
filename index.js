exports.CommandSet = class {
	constructor(client, name) {
		name = name.toLowerCase();
		this.client = client;
		this.name = name;
		this.commands = [];
	}
	getCommandByPath(path) {
		for (var i = 0; i < this.commands.length; i++) {
			if (this.commands[i].path.join(' ') == path) {
				return this.commands[i];
			}
		}
		return null;
	}
	unset(path) {
		for (var i = 0; i < this.commands.length; i++) {
			if (this.commands[i].path.join(' ') == path) {
				return this.commands.splice(i, 1)[0];
			}
		}
		return null;
	}
	set(path, action) {
		this.unset(path);
		return this.commands.push({
			path: path.split(' '),
			action: action
		});
	}
	listen() {
		var self = this;
		this.client.on('message', function (msg) {
			var args = msg.content.split(' ');
			if (args.shift().toLowerCase() != self.name) return;
			var path = [...args];
			var command;
			while (path.length) {
				console.log('"' + path.join(' ') + '"');
				command = self.getCommandByPath(path.join(' '));
				if (command) break;
				path.pop();
				if (!path.length) command = self.getCommandByPath('');
			}
			if (!command) return;
			args.splice(0, path.length);
			command.action(msg, args);
		});
	}
};
