// prismarine-chat
module.exports = function (bot) {
    bot.on("whisper", (username, message, translate, jsonMsg, matches) => {
        bot.log("[whisper] <" + username + ">: " + message)
    })

    bot.on("message", (message) => {
        bot.log(message.toAnsi()) // TO ANSI
    })

    bot.on("kicked", (reason, loggedIn) => {
        bot.log("[bot.kicked] reason: " + reason)
    })
}
