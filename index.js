require('dotenv').config(); // Load .env file
const { Client, GatewayIntentBits } = require('discord.js');
const math = require('mathjs');


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
    // Ignore bot messages
    if (message.author.bot) return;

    // Only process /calc commands
    if (!message.content.startsWith('/calc')) return;

     // Extract math expression after !calc
    const expression = message.content.slice(5).trim();

    if (!expression) {
        return message.reply('Please provide a math expression, e.g., `!calc 2+2`');
    }

    try {
        // Evaluate the expression using mathjs
        const result = math.evaluate(expression);

        message.reply(`Result: ${result}`);
    } catch (error) {
        message.reply('Error: Invalid math expression. Try something like `!calc 2+2` or `!calc 5*3`.');
    }
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);