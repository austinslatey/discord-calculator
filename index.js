require('dotenv').config(); // Load .env file
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new client instance with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Event: Bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event: Respond to messages
client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignore bot messages
  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);