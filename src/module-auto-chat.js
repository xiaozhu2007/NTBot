module.exports = function(bot) {
  bot.on('chat', (username, message) => {
    const answers = [
      {
        keyword: /^(map|dynmap|地图)/i,
        answer: 'http://localhost:9999/'
      },
      {
        keyword: /^(event|home)/i,
        answer: 'http://kenmomine.wiki.fc2.com/wiki/%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E4%BC%81%E7%94%BB/'
      },
      {
        keyword: /^(wiki)/i,
        answer: 'http://kenmomine.wiki.fc2.com/'
      },
    ];

    if (username === bot.username) return;

    answers.forEach((q) => {
      if (message.match(q.keyword)) {
        bot.safechat(q.answer, 1000);
      }
    });

  });
}