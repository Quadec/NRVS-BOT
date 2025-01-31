const {Client} = require("discord.js");
const {token} = require("./config");

const client = new Client();

require("./core/loadWidgetListeners")(client);

client.login(process.env.token).catch((error) => {
  console.error(error);
  process.exit(1);
});
