module.exports = function (bot) {
    var is_dead = false

    bot.on("death", () => {
        is_dead = true
    })

    bot.on("spawn", () => {
        if (!is_dead) return
        bot.log("[bot.death] " + bot.username + " dead at " + bot.position + ".")
        is_dead = false
    })
}
