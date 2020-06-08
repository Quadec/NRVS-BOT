const { Message } = require("discord.js");
const Executable = require("../classes/Executable");

module.exports = () => {
  Message.prototype.isUserMessage = function () {
    return !this.author.bot && !this.system;
  };

  Message.prototype.isCommand = function () {
    return this.client.prefixRegExp.test(this.content);
  };

  Message.prototype.getCommand = function (commandString) {
    return (
      this.client.commands.get(commandString) ||
      this.client.commands.find((command) =>
        command.aliases.includes(commandString)
      )
    );
  };

  Message.prototype.getExecutable = function () {
    const args = this.content.replace(this.client.prefixRegExp, "").split(/ +/);
    const commandString = args.shift().toLowerCase();
    const command = this.getCommand(commandString);

    return new Executable(this, command, args);
  };
};
