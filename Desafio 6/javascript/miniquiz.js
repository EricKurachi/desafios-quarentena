let isPlayingQuiz = false;
let playerChoice = '';
let finishedList = false;

/**
* Just a simple sleep function. It will return a promisse that will resolve itself
* in `time` milisseconds.
* @argument { number } time The time in Milisseconds the function will wait.
* @returns { Promise<void> }
*/
function sleep (time) {
	return new Promise(resolve => {
		setTimeout(() => resolve(), time);
	});
}


/**
* Function called when the user sent a message after already starting to play the quiz
* It will only accept answers after the alternatives have been showed and if its a valid answer
*
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
* @argument { string } message
*/
function getAnswer (bot, chatId, message) {
	if (finishedList === false){
		bot.sendMessage(chatId, 'Deixa eu terminar!');
		return;
	}
	else if (message == '1'){
		bot.sendMessage(chatId, 'É isso aí! \nIsso ocorre porque o detergente quebra as moléculas da gordura, fazendo com que a água as remova completamente.');
	}
	else if (message == '2' || message == '3' || message == '4'){
		bot.sendMessage(chatId, 'Errado! a resposta é 1! \nIsso ocorre porque o detergente quebra as moléculas da gordura, fazendo com que a água as remova completamente.');
	}
	else{
		bot.sendMessage(chatId, 'Essa resposta não faz sentido. Tente de novo');
		return;
	}

	playerChoice = '';
	isPlayingQuiz = false;
	finishedList = false;
}


/**
* This function will initiate the quiz game asking a question and 
* giving 4 alternatives.
*
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
*/
async function startQuiz (bot, chatId) {
	await bot.sendMessage(chatId, 'Qual a maneira correta de remover gordura da roupa?');
	await sleep(1000);
	await bot.sendMessage(chatId, '1 - Usar papel toalha para absorver a gordura');
	await sleep(1000);
	await bot.sendMessage(chatId, '2 - Pressionar o local atingido com um ferro quente');
	await sleep(1000);
	await bot.sendMessage(chatId, '3 - Esfregar a mancha com uma solução de água e detergente');
	await sleep(1000);
	await bot.sendMessage(chatId, '4 - Aplicar talco, deixando-o repousar por uma hora e em seguida removendo-o com uma pequena escova');
	finishedList = true; // The bot only accept answers after this attribution
}


/**
* Decides whether the user message is relevant to the game or not. If it is relevant,
* return a true boolean flag to prevent other functions to catch a response.
*
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
* @returns { boolean } A flag to indicate whether the message was used or not.
*/
function main (bot, chatId, message) {
	if (isPlayingQuiz) {
		getAnswer(bot, chatId, message);
		return true
	} else if (message === '/miniquiz') {
		startQuiz(bot, chatId, message);
		isPlayingQuiz = true;
		return true;
	} else {
		return false;
	}
}

module.exports = {
	main
}