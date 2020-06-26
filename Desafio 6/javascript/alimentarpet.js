let isChoosingOption = false;
let isChoosingHour = false;
let reminderHours = [];

function getReminderHours(){
    return reminderHours = [];
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
function chooseOption (bot, chatId, message){
    if(message === '1'){
        isChoosingHour = true;
        isChoosingOption = false;
        bot.sendMessage(chatId, "Digite a hora de 0 a 23 em que quer ser lembrado:");
    }
    if(message === '2'){
        reminderHours = [];
        bot.sendMessage(chatId, "Lembretes apagados");
        isChoosingOption = false;
    }
}

/**
* Chooses one of the options and writes it in the chat
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
* @argument { number } optionsQty
*/
function chooseHour (bot, chatId, message){
    if (0 <= parseInt(message, 10) <= 23){
        reminderHours.append(math.floor(message));
        isChoosingHour = false;
    }
    else{
        bot.sendMessage(chatId, "Horário inválido");
    }
}


/**
* If the user calls the command '/escolher' it asks for a number of choices
* and checks if the number is valid.
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
* @argument { string } chatMessage
* @returns { boolean } A flag to indicate whether the message was used or not.
*/
function main(bot, chatId, message, d){
    if (d.getHours() != lastRegisteredHour && reminderHours.includes(d.getHours())){
        chooseOption(bot, chatId, message);
    }
    else if (isChoosingOption){
        chooseOption(bot, chatId, message);
    }
    else if (isChoosingHour){
        chooseHour(bot, chatId, message);
    }
    else if (message === "/alimentarpet"){
        bot.sendMessage(chatId, "1 - Adicionar horário para receber lembrete\n2 - Excluir lembretes atuais");
        isChoosingOption = true;
        return true;
    } else{
        return false;
    } 
}

module.exports = {
    main, getReminderHours
}