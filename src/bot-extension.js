const dateformat = require("dateformat")
const delay = require("delay")
const readline = require("readline")

module.exports = function (bot) {
    this.bot = bot
    this.bot.hasInterrupt = false

    bot.on("login", () => {
        bot.log("[bot-extension.init] 插件系统初始化成功")
        bot.log("[bot-extension.start] 插件系统启动")
        bot.init_readline()
        bot.log("[bot-readline.init] ReadLine初始化成功")
    })

    bot.on("end", () => {
        bot.log("[bot-extension.end] 插件系统关闭")
        bot.close_readline()
        bot.log("[bot-readline.close] ReadLine关闭成功")
    })

    // 输入处理
    this.bot.init_readline = () => {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })
        this.rl.setPrompt("HTMC> ") //输入头

        // 输入信息即发送
        this.rl.on("line", (line) => {
            this.safechat(line)
            // this.bot.chat(line);
        })

        this.rl.on("SIGINT", () => {
            this.bot.log("[bot.readline] SIGINT 退出中")
            this.bot.hasInterrupt = true
            delay(500).then(() => {
                this.bot.quit() // Exit the server.
            })
        })
    }

    this.bot.close_readline = () => {
        this.rl.close()
    }

    // Prompt处理

    this.bot.log = (...args) => {
        readline.cursorTo(process.stdout, 0)

        if (typeof args[0] === "string") {
            // 插入现在时间
            args[0] = "[" + dateformat(new Date(), "isoTime") + "] " + args[0]
        }
        console.log.apply(console, args)

        if (typeof this.rl !== "undefined") this.rl.prompt(true)
    }

    //从jmes形式的信息中只抽出文本成分并以字符串形式返回

    this.bot.jmes_to_text = (jmes) => {
        var message = ""
        if (jmes.text) message = jmes.text

        if (jmes.extra)
            jmes.extra.forEach((v) => {
                message += v.text
            })
        return message
    }

    //加入防止同一信息循环发送、短时间内大量发送等措施的聊天发送方法
    this.safechat_send_text_cache = []
    this.safechat_last_send_time = new Date().getTime()
    this.safechat_continuous_count = 0

    this.safechat = (text) => {
        var current_time = new Date().getTime()

        var elapsed_ms = current_time - this.safechat_last_send_time

        if (!text) return

        if (elapsed_ms > 1000) {
            this.safechat_continuous_count = 0
        }

        this.safechat_continuous_count++
        if (this.safechat_continuous_count > 10) {
            this.bot.log("[bot.safechat] 短时间内发送了大量信息")
            return
        }

        if (elapsed_ms > 3000) {
            //经过一定时间后会忘记之前的信息
            this.safechat_send_text_cache = []
        }

        if (
            this.safechat_send_text_cache.find((value) => {
                return value === text
            })
        ) {
            this.bot.log("[bot.safechat] 在一定时间内同一消息被多次发送: " + text)
            return
        }
        this.safechat_send_text_cache.push(text)

        this.safechat_last_send_time = current_time
        this.bot.chat(text)
    }

    this.bot.safechat = (text, delay_ms = 800) => {
        delay(delay_ms).then(() => {
            this.safechat(text)
        })
    }

    //随机选择数组中定义的多个语句中的一个，进行聊天发送

    this.bot.randomchat = (messages, delay_ms = 800) => {
        var message
        if (Array.isArray(messages)) {
            message = messages[Math.floor(Math.random() * messages.length)]
        } else {
            message = messages
        }
        delay(delay_ms).then(() => {
            this.safechat(message)
        })
    }
}
