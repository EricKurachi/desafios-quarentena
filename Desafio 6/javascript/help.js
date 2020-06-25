/**
* show commands when the user types /help
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
* @returns { string } bot commands
*/
async function commands (bot, chatId) {
    await bot.sendMessage(chatId, 
        "Estou aqui para resolver todos os problemas do seu home office! \n" +
        "Me diga o que precisa: \n\n" +
        "/escolher - se precisar de ajuda para fazer alguma escolha \n" +
        "/escolhercomida - não tem ideia do que pedir no ifood? \n" +
        "/bomdia - acorde bem acompanhado :) \n" +
        "/boanoite - lembre-se de dormir! \n" +
        "/alimentarpet - lembrete para alimentar seu pet \n" +      
        "/listadecompras - vamos fazer compras! Com máscara e álcool... \n" +
        "/encontrarreceita - encontre uma receita com um ingrediente inicial \n" +
        "/minigame - um quiz simples sobre limpeza doméstica \n"
    );
}

module.exports = {
    commands
};