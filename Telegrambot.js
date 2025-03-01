const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const token = "7962791112:AAFebr_cOX6KhmLZ1HJq_k1nXnFIU8pJDSk";
const bot = new TelegramBot(token, { polling: true });
var serviceAccount = require("./keys.json");
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    let pname = msg.text.toLowerCase();
    const apiurl = 'https://pokeapi.co/api/v2/pokemon/' + pname;
    request(apiurl, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            bot.sendMessage(chatId, 'Pokemon not found. Please check the name and try again.');
            return;
        }
        const data = JSON.parse(body);
        const details = 
        'Name: '+data.name+'\n' +
        'Height:' +data.height+ '\n' +
        'Weight:' +data.weight+'\n'+
        'Base Experience:' + data.base_experience;
        bot.sendMessage(chatId, details);
    });
});