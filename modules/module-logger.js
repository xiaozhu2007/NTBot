// prismarine-chat
module.exports = function (bot) {
    bot.on("whisper", (username, message) => {
        bot.log("[whisper] <" + username + ">: " + message)
    })

    bot.on("message", (message) => {
        bot.log(message.toAnsi()) // TO ANSI
    })

    bot.on("kicked", (reason) => {
        bot.log("[bot.kicked] reason: " + reason)
    })
}
