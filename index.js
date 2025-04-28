require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const commands = require('./utils/commands');

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

    if (!prefixUsed) {
        console.log('No prefix found in message:', message.content);
        return;
    }

    // Split input on whitespace, preserving multiple spaces
    const args = message.content.slice(prefixUsed.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();
    console.log('Parsed command:', command, 'Args:', args, 'Raw input:', message.content);

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
- **matrix <operation> <matrix>**: Matrix operations (e.g., \`${prefixUsed} matrix det [[1,2],[3,4]] or \`${prefixUsed} matrix solve [[2,1],[1,-1]] | [5,1]\`)
- **convert <value> <from> to <to>**: Unit conversion (e.g., \`${prefixUsed} convert 10 km to miles\`)
- **percent <operation> <value> by <percentage>**: Calculate percentage increase or decrease (e.g., \`${prefixUsed} percent increase 100 by 20\`)
- **percentchange <oldValue> <newValue>**: Calculate percentage change between two numbers (e.g., \`${prefixUsed} percentchange 100 20\`)
- **help**: Show this help message

**Examples:**
- \`${prefixUsed} basic 5 * sin(3)\`
- \`${prefixUsed} solve 2x + 3 = 7\`
- \`${prefixUsed} derive cos(x)\`
- \`${prefixUsed} convert 100 cm to inches\`
- \`${prefixUsed} percent decrease 100 by 20\`
- \`${prefixUsed} percentchange 100 120\`
- \`${prefixUsed} matrix solve [[2,1],[1,-1]] | [5,1]\`
        `;
        return message.reply(helpMessage);
    }

    // Command handling
    try {
        if (command === 'basic') {
            const expression = args.join(' ');
            console.log('Basic command, expression:', expression);
            const result = commands.basic(expression);
            message.reply(`Result: ${result}`);
        }
        else if (command === 'solve') {
            const equation = args.join(' ');
            console.log('Solve command, equation:', equation);
            const result = commands.solve(equation);
            message.reply(`Solutions: ${result}`);
        }
        else if (command === 'derive') {
            const expression = args.join(' ');
            console.log('Derive command, expression:', expression);
            const result = commands.derive(expression);
            message.reply(`Derivative: ${result}`);
        }
        else if (command === 'integrate') {
            const expression = args.join(' ');
            console.log('Integrate command, expression:', expression);
            const result = commands.integrate(expression);
            message.reply(`Indefinite Integral: ${result} + C`);
        }
        else if (command === 'matrix') {
            const operation = args[0] ? args[0].toLowerCase() : '';
            const matrixStr = args.slice(1).join(' ');
            console.log('Matrix command, operation:', operation, 'matrixStr:', matrixStr);
            if (operation === 'solve') {
                const [matrixA, vectorB] = matrixStr.split('|').map(s => s.trim());
                const result = commands.matrixSolve(matrixA, vectorB);
                message.reply(`Solutions: ${result}`);
            } else {
                const result = commands.matrix(operation, matrixStr);
                if (operation === 'det') {
                    message.reply(`Determinant: ${result}`);
                } else if (operation === 'inv') {
                    message.reply(`Inverse: ${result}`);
                }
            }
        }
        else if (command === 'convert') {
            const value = parseFloat(args[0]);
            const fromUnit = args[1];
            const toUnit = args[3];
            console.log('Convert command, value:', value, 'fromUnit:', fromUnit, 'toUnit:', toUnit);
            const result = commands.convert(value, fromUnit, toUnit);
            message.reply(`Result: ${result}`);
        }
        else if (command === 'percent') {
            const operation = args[0] ? args[0].toLowerCase() : '';
            const value = parseFloat(args[1]);
            const percentage = parseFloat(args[3]);
            console.log('Percent command, operation:', operation, 'value:', value, 'percentage:', percentage);
            const result = commands.percent(operation, value, percentage);
            message.reply(`Result: ${result}`);
        }
        else if (command === 'percentchange') {
            const oldValue = parseFloat(args[0]);
            const newValue = parseFloat(args[1]);
            console.log('percentChange inputs:', { oldValue, newValue });
            const change = commands.percentChange(oldValue, newValue);
            const direction = change >= 0 ? 'increase' : 'decrease';
            message.reply(`Result: ${Math.abs(change)}% ${direction}`);
        }
        else {
            console.log('Unrecognized command:', command, 'Falling back to basic');
            const expression = message.content.slice(prefixUsed.length).trim();
            if (!expression) return message.reply('Please provide a math expression, e.g., `2+2`.');
            const result = commands.basic(expression);
            message.reply(`Result: ${result}`);
        }
    } catch (error) {
        console.error('Error:', error);
        message.reply(`Error: ${error.message || 'Invalid input or operation. Use `!calc help` for guidance.'}`);
    }
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);