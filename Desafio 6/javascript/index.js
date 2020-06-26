process.env.NTBA_FIX_319 = true; // Silences an annoying error message.
const TelegramBot = require('node-telegram-bot-api');
const token = require('./token');
const randomPhrases = require('./random-phrases');
const help = require('./help');
const escolher = require('./escolher');
const escolhercomida = require('./escolhercomida');
const miniquiz = require('./miniquiz');
const jokempo = require('./jokempo');
//const alimentarpet = require('./alimentarpet');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token.get(), {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
	const chatMessage = msg.text.trim().toLowerCase();
	const chatId = msg.chat.id;
	if (chatMessage.startsWith('ola') || chatMessage.startsWith('oi')) {
		bot.sendMessage(chatId, 'Oi Turupom?');
	}
	else if (chatMessage.startsWith('tchau') || chatMessage.startsWith('adeus')){
		bot.sendMessage(chatId, 'tchau, se cuida');
	}
	else if (chatMessage.startsWith('cobra') || chatMessage.startsWith('falsa')){
		bot.sendMessage(chatId, 'Só não sambo na sua cara porque não piso em falso');
	}
	else if (help.main(bot, chatId, chatMessage)) return;
	else if (jokempo.main(bot, chatId, chatMessage)) return;
	else if (escolher.main(bot, chatId, chatMessage)) return;
	else if (escolhercomida.main(bot, chatId, chatMessage)) return;
	//else if (alimentarpet.main(bot, chatId, chatMessage)) return;
	else if (miniquiz.main(bot, chatId, chatMessage)) return;
	else {
		randomPhrases.writeRandomPhrase(bot, chatId);
	}
});

console.log('Fetching data...');
bot.getMe().then(me => {
	console.log(`I'm ready to serve! Talk to me on @${me.username}`);
	console.log(`or visit this link: https://t.me/${me.username}`);
});