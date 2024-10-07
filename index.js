const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

// Replace with your own token
const token = "7865623009:AAHaE6moxB6jQPDzeTpjS-yTqxltWGnov10";
const bot = new TelegramBot(token);

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming requests
app.use(express.json());

// Set your webhook URL
const webhookUrl = `https://telegram-bot-server-two.vercel.app/${token}`;
bot.setWebHook(webhookUrl);

// Handle incoming updates
app.post(`/${token}`, (req, res) => {
    const msg = req.body.message;
    if (msg) {
        const chatId = msg.chat.id;

        // Check if the message is a '/start' command
        if (msg.text === '/start') {
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

            // Send welcome message with the button
            bot.sendMessage(chatId, "Welcome! Click the button below to open the user info app.", options);
        } else {
            // Optionally handle other messages
            bot.sendMessage(chatId, "You sent: " + msg.text);
        }
    }

    // Respond to Telegram to acknowledge receipt of the update
    res.sendStatus(200);
});

// Define a simple route to test the server
app.get("/", (req, res) => {
    res.send("Express server is running!");
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Express server is running on http://localhost:${PORT}`);
});