let isChoosing = false;

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
function choose (bot, chatId, optionsQty){
    bot.sendMessage(chatId, "Escolha a opção " + randomPositiveInt(optionsQty).toString());
}


/**
* If the user calls the command '/escolher' it asks for a number of choices
* and checks if the number is valid.
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
* @argument { string } chatMessage
* @returns { boolean } A flag to indicate whether the message was used or not.
*/
function main(bot, chatId, chatMessage){
    if (chatMessage === "/escolher"){
        bot.sendMessage(chatId, 
            'Vou te ajudar a fazer a sua escolha! \n' +
            'Diga entre quantas opções tem que escolher e numere elas:');
        isChoosing = true;
        return true;
    } else if (isChoosing){
        chatMessage = parseInt(chatMessage, 10);
        if (chatMessage > 0){
            choose(bot, chatId, chatMessage);
        } else {
            bot.sendMessage(chatId, "Desculpa, número inválido");
        }
        isChoosing = false;
        return true;
    } else{
        return false;
    } 
}

module.exports = {
	main
}