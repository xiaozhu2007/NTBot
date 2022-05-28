require('dotenv').config();
const delay = require('delay');
const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder').pathfinder;
/***
 _   _ _____ ____        _   
| \ | |_   _| __ )  ___ | |_ 
|  \| | | | |  _ \ / _ \| __|
| |\  | | | | |_) | (_) | |_ 
|_| \_| |_| |____/ \___/ \__|
              Powered By NTBot
**/
function start() {
  const bot = mineflayer.createBot({
    host: process.env.MC_HOST,
    port: process.env.MC_PORT,
    username: process.env.MC_USERNAME,
    password: process.env.MC_PASSWORD || '',
    version: process.env.MC_VERSION || '1.16.5',
    auth: process.env.MC_AUTH || '',
    verbose: true
  });

  console.log('Connecting to [%s:%s](%s)', process.env.MC_HOST, process.env.MC_PORT, bot.version);
  bot.loadPlugin(pathfinder);
  require('./src/bot-extension')(bot);

  function chatAddPattern(bot) {
    try {
      // bot.addChatPattern('chat', /^(?:\[[^\]]*\])<([^ :]*)> (.*)$/);
      bot.addChatPattern('whisper', /^([^ ]*) 悄悄的对你说 (.*)$/); //FOR 原版
      // bot.addChatPattern('whisper', /^([^ ]*) -> (.*)$/); //FOR 其他非原版服务器
    } catch (e) {
      console.log('[bot.error.addChatPattern] ' + e);
    }
  }

  bot.on('end', () => {
    bot.log('[bot.end]');
    if (bot.hasInterrupt) {
      process.exit(0);
    } else {
      bot.log('[bot.end] 正在尝试 1 分钟后重新连接...');
      delay(60000).then(() => { start(); });
    }
  });

  bot.on('connect', () => {
    bot.log('[bot.connect] 用户: [' + bot.username + ']');

    chatAddPattern(bot);

    // 加载模块
    // require('./modules/module-action-move')(bot); //报错
    // require('./modules/module-action-follow')(bot);
    require('./modules/module-logger')(bot); // Better Logger
    require('./modules/module-chat-hi')(bot); // say Hello to other players
    require('./modules/module-chat-death')(bot); // Log when bot died
    require('./modules/module-chat-countdown')(bot); // Count Down
    require('./modules/module-auto-chat') // Auto Response
    require('./modules/module-chat-google')(bot); // Search on Google
    require('./modules/module-chat-baidu')(bot); // Search on Baidu
    require('./modules/module-data-record')(bot); // Data Record
    require('./modules/module-update')(bot); // Nothing.
    require('./modules/module-help')(bot); // The main help menu
    require('./modules/module-login')(bot); // Auto Login
  });
  bot.on('error', err => console.log(err));
}

process.on('uncaughtException', (err) => {
  console.log('[process.uncaughtException] ' + err);
  bot.log('[process.uncaughtException] Trying reconnection 30s later...');
  delay(30000).then(() => { start(); });
});

try {
  start();
} catch(e) {
  console.error('[bot.error.all] 全局错误 : ' + e);
}
