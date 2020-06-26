const foods = [
    'Pizza!', 
    'Hambúrguer!', 
    'Massas!', 
    'Hot dog!', 
    'Marmita!', 
    'Comida Mexicana!', 
    'Comida Japonesa!', 
    'Comida Árabe!', 
    'Comida vegetariana!', 
    'Pastel/salgados!', 
    'Sopa!']

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
* generate a random number between zero and the max number
* @argument { int } max
* @returns { int } the random int
*/
function randomPositiveInt(max) {
	return Math.floor(max * Math.random());
}   

/**
* Chooses one of the options and writes it in the chat
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
* @argument { number } optionsQty
*/
async function chooseFood (bot, chatId, optionsQty){
    bot.sendMessage(chatId, 'Vou te ajudar a escolher um tipo de comida!');
    await sleep(500)
    bot.sendMessage(chatId, 'Hoje você vai pedir...');
    await sleep(2000)
    bot.sendMessage(chatId, foods[randomPositiveInt(foods.length)]);
}


/**
* If the user calls the command '/escolhercomida' it asks for a number of choices
* and checks if the number is valid.
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
* @argument { string } chatMessage
* @returns { boolean } A flag to indicate whether the message was used or not.
*/
function main(bot, chatId, chatMessage){
    if (chatMessage === "/escolhercomida"){
        chooseFood(bot, chatId)
        return true;
    } else{   //oi
        return false;
    }
}

module.exports = {
	main
}