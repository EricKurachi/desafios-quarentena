const helpMessage = (
        "Estou aqui para resolver alguns problemas do seu home office! \n" +
        "Me diga o que precisa: \n\n" +
        "/escolher - se precisar de ajuda para fazer alguma escolha \n" +
        "/escolhercomida - não tem ideia do que pedir no ifood? \n" +
        //"/alimentarpet - lembrete para alimentar seu pet \n" +     
        "/miniquiz - um quiz simples sobre limpeza doméstica \n" +
        "/jokempo - vamos jogar jokempo! \n"
    );

/**
* checks if the user typed /help and if so show all the commands
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
* @argument { string } chatMessage
*/
function main (bot, chatId, chatMessage) {
    if (chatMessage === "/help") bot.sendMessage(chatId, helpMessage);
}

module.exports = {
    main
}