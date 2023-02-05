module.exports = function (bot) {
    bot.once("login", () => {
    // bot.safechat('hi', 2000);
    })

    // 应答最新进入的玩家
    this.last_joined_player = null

    bot.on("playerJoined", (player) => {
        this.last_joined_player = player.username
    })

    bot.on("chat", (username, message) => {
        if (username === bot.username) return

        if (username === this.last_joined_player) {
            if (message.match(/^(?:hi|hello)$/)) bot.safechat("hi", 2000)
            if (message.match(/^(?:大家好|你好)/)) bot.safechat("你好", 2000)

            this.last_joined_player = null
        }
    })
}
