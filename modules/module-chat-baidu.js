module.exports = function (bot) {
    bot.on("chat", (username, message) => {
        if (username === bot.username) return

        if (message.match(/(^|\()(bd|baidu|百度|查)\s*[\(]?([^\(\)]*)[\)]?/gi)) {
            const keyword = RegExp.$3
            if (keyword) {
                bot.safechat(`https://m.baidu.com/s?word=${keyword}`, 1500)
            }
        }

        if (message.match(/(^|\()(image|img|图片)\s*[\(]?([^\(\)]*)[\)]?/gi)) {
            const keyword = RegExp.$3
            if (keyword) {
                bot.safechat(
                    `https://m.baidu.com/sf/vsearch?pd=image_content&word=${keyword}&tn=vsearch&atn=page&sa=vs_img_indexhot&fr=index`,
                    1000
                )
            }
        }

        if (message.match(/(^|\()(map|地图)\s*[\(]?([^\(\)]*)[\)]?/gi)) {
            const keyword = RegExp.$3
            if (keyword) {
                bot.safechat(`https://map.baidu.com/s?q=${keyword}`, 1000)
            }
        }
    })
}
