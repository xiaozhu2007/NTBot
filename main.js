/***
 _   _ _____ ____        _   
| \ | |_   _| __ )  ___ | |_ 
|  \| | | | |  _ \ / _ \| __|
| |\  | | | | |_) | (_) | |_ 
|_| \_| |_| |____/ \___/ \__|
              Powered By NTBot
**/
const delay = require("delay")
const mineflayer = require("mineflayer")
const pathfinder = require("mineflayer-pathfinder").pathfinder

function start() {
    /**
   * @description 主程序
   */
    const bot = mineflayer.createBot({
        host: process.env.NT_HOST || "mc.weeaxe.cn",
        port: process.env.NT_PORT || 25565,
        username: process.env.NT_USERNAME || "_ssdhbfbcb_",
        password: process.env.NT_PASSWORD || "",
        version: process.env.NT_VERSION || "1.19.1",
        auth: process.env.NT_AUTH || "",
        verbose: true,
    })

    console.log(
        "Connecting to [%s:%s](%s)",
        process.env.NT_HOST,
        process.env.NT_PORT,
        bot.version
    )
    bot.loadPlugin(pathfinder)
    require("./src/bot-extension")(bot)

    function chatAddPattern(bot) {
    /**
     * @description 添加聊天解析格式
     * @global bot
     * @copyright xiaozhu2007
     */
        try {
            // bot.addChatPatternSet('chat', /^(?:\[[^\]]*\])[([^ :]*)] (.*)$/);
            // bot.addChatPatternSet('chat', /^(?:\[[^\]]*\])<([^ :]*)> (.*)$/);
            bot.addChatPatternSet("whisper", /^([^ ]*) 悄悄的对你说 (.*)$/) //FOR 原版
            // bot.addChatPattern('whisper', /^([^ ]*) -> (.*)$/); //FOR 其他非原版服务器
        } catch (e) {
            console.log("[bot.error.addChatPattern] " + e)
        }
    }

    bot.on("end", () => {
        bot.log("[bot.end]")
        if (bot.hasInterrupt) {
            process.exit(0)
        } else {
            bot.log("[bot.end] Trying reconnection 30s later...")
            delay(30000).then(() => {
                start()
            })
        }
    })

    bot.on("connect", () => {
        bot.log("[bot.connect] Login as user [" + bot.username + "]")

        chatAddPattern(bot)

        /** 加载模块 */
        /** @deprecated This will throw an error. */
        // require('./modules/module-action-move')(bot);

        /** @deprecated This will throw an error. */
        // require('./modules/module-action-follow')(bot);

        require("./modules/module-logger")(bot) // Better Logger

        require("./modules/module-chat-hi")(bot) // say Hello to other players

        require("./modules/module-chat-death")(bot) // Log when bot died

        require("./modules/module-chat-countdown")(bot) // Count Down

        require("./modules/module-auto-chat") // Auto Response

        require("./modules/module-update")(bot) // Nothing.

        require("./modules/module-help")(bot) // The main help menu

        require("./modules/module-login")(bot) // Auto Login
    })
    bot.on("error", (err) => console.log(err))
}

process.on("uncaughtException", (err) => {
    console.log("[process.uncaughtException] " + err)
    this.bot.log("[process.uncaughtException] Trying reconnection 30s later...")
    delay(30000).then(() => {
        start()
    })
})

try {
    start()
} catch (e) {
    console.error("[bot.error.all] 全局错误 : " + e)
}
