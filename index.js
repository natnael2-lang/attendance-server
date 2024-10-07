const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

// Replace with your own token
const token = "7865623009:AAHaE6moxB6jQPDzeTpjS-yTqxltWGnov10";
const bot = new TelegramBot(token, { polling: true });

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Start command handler
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Open User Info",
                        url: "https://telegram-user-info.vercel.app/",
                    },
                ],
            ],
        },
    };

    bot.sendMessage(
        chatId,
        "Welcome! Click the button below to open the user info app.",
        options,
    );
});

// Define a simple route to test the server
app.get("/", (req, res) => {
    res.send("Express server is running!");
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Express server is running on http://localhost:${PORT}`);
});

// Keep the bot running
console.log("Bot is running...");