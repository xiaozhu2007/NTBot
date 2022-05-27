module.exports = function(bot) {
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;

    if (message.match(/(\w*)\W*(?:倒计时)/) && RegExp.$1 === bot.username) {
      bot.safechat('倒计时', 500);
      bot.safechat('> 3', 3000);
      bot.safechat('> 2', 4000);
      bot.safechat('> 1', 5000);
      bot.safechat('> 我是傻逼!', 6000);
    }
  })
}