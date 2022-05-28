module.exports = function(bot) {

  bot.on('chat', (username, message) => {
    if (bot.username === username) return;

    if (message.match(/BOT|机器人/)) {
      bot.randomchat(['我不是机器人', '机器人？', '真的？']);
    }
  });


  bot.on('whisper', (username, message) => {
    if (bot.username === username) return;

    if (message.match(/^(?:h|help|HELP|帮助)/))
    {
      bot.safechat('/tell ' + username + ' 你好啊 (By NTBot)');
      bot.safechat('/tell ' + username + ' === 私聊命令 ===');
      bot.safechat('/tell ' + username + ' 查看记忆: /tell ' + bot.username + ' 记忆');
      bot.safechat('/tell ' + username + ' 记忆追加: /tell ' + bot.username + ' 记忆|保存 <key> <value>');
      bot.safechat('/tell ' + username + ' 记忆删除: /tell ' + bot.username + ' 删除|消去 <key>');
    }
  });
}