const TelegramBot = require('node-telegram-bot-api');

// Replace with your own Bot Token from BotFather
const token = '7865623009:AAHaE6moxB6jQPDzeTpjS-yTqxltWGnov10';
const bot = new TelegramBot(token);

// The handler function
module.exports.telegramWebhook = async (event) => {
    const update = JSON.parse(event.body);
    console.log(update);cls
    bot.processUpdate(update);

    return {
        statusCode: 200,
        body: 'Webhook received',
    };
};

// Start command handler
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Open User Info', url: '' }]
            ]
        }
    };

    bot.sendMessage(chatId, 'Welcome! Click the button below to open the user info app.', options);
});