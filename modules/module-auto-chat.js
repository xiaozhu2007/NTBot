module.exports = function (bot) {
    bot.on("chat", (username, message) => {
        const answers = [
            // 感谢赞助商 weeaxe.cn (小木斧)
            {
                keyword: /^(map|dynmap|地图)/i,
                answer: "https://map.weeaxe.cn/",
            },
            {
                keyword: /^(event|home)/i,
                answer: "https://www.weeaxe.cn/",
            },
        ]

        if (username === bot.username) return

        answers.forEach((q) => {
            if (message.match(q.keyword)) {
                bot.safechat(q.answer, 1000)
            }
        })
    })
}
