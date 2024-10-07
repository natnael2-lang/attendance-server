const TelegramBot = require('node-telegram-bot-api');

// Replace with your own token
const token = '7865623009:AAHaE6moxB6jQPDzeTpjS-yTqxltWGnov10';
const bot = new TelegramBot(token, { polling: true });

// Start command handler
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const options = {
        reply_markup: {
            keyboard: [
                [{ text: 'Open Web App' }]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    };

    bot.sendMessage(chatId, 'Welcome! Click the button below to open the web app.', options);
});

// Handle button click
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (msg.text === 'Open Web App') {
        bot.sendMessage(chatId, 'Click here to open the web app: [Open Web App](https://your-web-app-url.com)', {
            parse_mode: 'Markdown'
        });
    }
});

console.log('Bot is running...');