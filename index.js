require('dotenv').config();
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
    if (message.author.bot) return;

    const prefixes = ['/calc', '!calc'];
    const prefixUsed = prefixes.find(prefix => message.content.startsWith(prefix));

    if (!prefixUsed) return;

    const args = message.content.slice(prefixUsed.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    // Help command
    if (command === 'help') {
        const helpMessage = `
**MathBot Help**
Use \`${prefixUsed} <command> <expression>\` to perform calculations.
**Commands:**
- **basic <expression>**: Evaluate a math expression (e.g., \`${prefixUsed} basic 2+2\`)
- **solve <equation>**: Solve an equation (e.g., \`${prefixUsed} solve x^2 - 4 = 0\`)
- **derive <expression>**: Compute the derivative (e.g., \`${prefixUsed} derive x^2\`)
- **integrate <expression>**: Compute the indefinite integral (e.g., \`${prefixUsed} integrate x^2\`)
- **matrix <operation> <matrix>**: Matrix operations (e.g., \`${prefixUsed} matrix det [[1,2],[3,4]]\`)
- **convert <value> <from> to <to>**: Unit conversion (e.g., \`${prefixUsed} convert 10 km to miles\`)
- **help**: Show this help message

**Examples:**
- \`${prefixUsed} basic 5 * sin(3)\`
- \`${prefixUsed} solve 2x + 3 = 7\`
- \`${prefixUsed} derive cos(x)\`
- \`${prefixUsed} convert 100 cm to inches\`
        `;
        return message.reply(helpMessage);
    }

    // Command handling
    try {
        if (command === 'basic') {
            const expression = args.join(' ');
            if (!expression) return message.reply('Please provide a math expression, e.g., `2+2`.');
            const result = math.evaluate(expression);
            message.reply(`Result: ${result}`);
        }
        else if (command === 'solve') {
            const equation = args.join(' ');
            if (!equation) return message.reply('Please provide an equation, e.g., `x^2 - 4 = 0`.');
            const solutions = math.solve(equation, 'x'); // Assumes solving for 'x'
            message.reply(`Solutions: ${solutions.join(', ')}`);
        }
        else if (command === 'derive') {
            const expression = args.join(' ');
            if (!expression) return message.reply('Please provide an expression, e.g., `x^2`.');
            const derivative = math.derivative(expression, 'x').toString();
            message.reply(`Derivative: ${derivative}`);
        }
        else if (command === 'integrate') {
            const expression = args.join(' ');
            if (!expression) return message.reply('Please provide an expression, e.g., `x^2`.');
            const integral = math.integrate(expression, 'x').toString();
            message.reply(`Indefinite Integral: ${integral} + C`);
        }
        else if (command === 'matrix') {
            const operation = args[0].toLowerCase();
            const matrixStr = args.slice(1).join(' ');
            if (!operation || !matrixStr) return message.reply('Please provide an operation and matrix, e.g., `det [[1,2],[3,4]]`.');
            let result;
            const matrix = math.evaluate(matrixStr);
            if (operation === 'det') {
                result = math.det(matrix);
                message.reply(`Determinant: ${result}`);
            } else if (operation === 'inv') {
                result = math.inv(matrix);
                message.reply(`Inverse: ${JSON.stringify(result)}`);
            } else {
                message.reply('Supported matrix operations: `det`, `inv`.');
            }
        }
        else if (command === 'convert') {
            const value = parseFloat(args[0]);
            const fromUnit = args[1];
            const toUnit = args[3];
            if (isNaN(value) || !fromUnit || !toUnit) {
                return message.reply('Please provide a valid conversion, e.g., `10 km to miles`.');
            }
            const result = math.unit(value, fromUnit).to(toUnit).toString();
            message.reply(`Result: ${result}`);
        }
        else {
            // Default to basic evaluation if no specific command
            const expression = message.content.slice(prefixUsed.length).trim();
            if (!expression) return message.reply('Please provide a math expression, e.g., `2+2`.');
            const result = math.evaluate(expression);
            message.reply(`Result: ${result}`);
        }
    } catch (error) {
        console.error(error);
        message.reply('Error: Invalid input or operation. Use `!calc help` for guidance.');
    }
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);