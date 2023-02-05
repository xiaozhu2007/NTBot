module.exports = function (bot) {
    bot.once("spawn", () => {
        if (process.env.LOGIN != "no") {
            bot.chat("/login " + process.env.LOGIN_PASSWORD)
            console.log("[bot.login] 登录成功")
        }
    })
}
