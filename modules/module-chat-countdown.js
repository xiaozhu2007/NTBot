module.exports = function (bot) {
    bot.on("chat", (username, message) => {
        if (username === bot.username) return

        // TODO: 有人知道怎么正则“倒计时”这个文本吗
        if (message.match(/^(?:倒计时|djs)$/) && RegExp.match === bot.username) {
            bot.safechat("倒计时", 500)
            bot.safechat("> 3", 3000)
            bot.safechat("> 2", 4000)
            bot.safechat("> 1", 5000)
            bot.safechat("> 我是傻逼!", 6000)
        }
    })
}
