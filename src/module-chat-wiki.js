module.exports = function(bot) {
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.match(/(^|\()(wiki|维基百科|百科)\s*[\(]?([^\(\)]*)[\)]?/gi)) {
      const keyword = RegExp.$3;
      if (keyword) {
        bot.safechat(`https://minecraft.fandom.com/zh/wiki/?search=${keyword}`, 1500);
      }
    }

  });
}