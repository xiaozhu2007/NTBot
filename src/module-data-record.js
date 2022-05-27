const jsonfile = require('jsonfile');
const filename = 'data.record.json'
const record_lifetime_ms = 30 * 24 * 60 * 60 * 1000; // 30天

module.exports = function(bot) {
  this.record = [];
  this.last_record_user = null;
  this.last_record_key = null;
  //启动时加载保存的数据
  jsonfile.readFile(filename, (err, obj) => {
    if (!err) {
      this.record = obj;
      expire();
    }
  });

  function get_expire_at() {
    return Date.now() + record_lifetime_ms;
  }

  // 指定されたキーと結び付けられたデータを記憶する
  function record(key, value, teacher) {
    remove(key);

    this.record.push({
      key: key,
      value: value,
      teacher: teacher,
      expire_at: get_expire_at()
    });

    jsonfile.writeFileSync(filename, this.record);
  }

  // 指定消去的记忆
  function remove(key) {
    var new_record = this.record.filter((item, index) => {
      if (item.key !== key) return true;
    });
    this.record = new_record;

    jsonfile.writeFileSync(filename, this.record);
  }

  // 一定期間使われなかった記憶は消滅する
  function expire() {
    var expired = [];
    this.record.forEach((r) => {
      bot.log('[data-record] ' + Date.now() + ': ' + r.expire_at)
      if (Date.now() > r.expire_at) {
        bot.log('[data-record] expired [' + r.key + ']: ' + r.value)
        expired.push(r.key);
      }
    });
    expired.forEach((key) => {
      remove(key);
    });
  }

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;

    // 記憶データの各キーワードとマッチ判定を行い、
    // 該当する文言があればvalueをチャットに出力する
    if (this.record) {
      this.record.forEach((r) => {
        if (message.match(new RegExp('^' + r.key + "$", 'i'))) {
          var m = r.key + 'は' + r.value.replace(new RegExp('^\/', '')) + ' ';
          bot.randomchat([m, m + ' だって' + r.teacher + 'が言ってた', r.teacher + 'によると ' + m + ' なんだって']);
  
          // 使われた記憶は寿命を延ばす
          r.expire_at = get_expire_at();
        }
      });
    }

    // 撤销(相当于Undo功能)
    if (username === last_record_user && message.match(/^(?:淦|嘘)(?:undo|撤)/)) {
      bot.safechat('OK');
      remove(this.last_record_key);

      this.last_record_user = null;
      this.last_record_key = null;
    }
  });

  bot.on('whisper', (username, message) => {
    // どんなデータを記憶しているかどうかを確認する手段
    if (message.match(/^记忆$/)) {
      if (this.record && this.record.length > 0) {
        this.record.forEach((r) => {
          bot.safechat('/r ' + r.key + ' : ' + r.value);
        });
      } else {
        bot.safechat('/r OK');
      }
    }

    // 记忆追加
    if (message.match(/^(?:记忆|保存)\s+(\S+)\s+(\S*)/)) {
      var key = RegExp.$1.trim();
      var value = RegExp.$2.trim();
      
      if (key === bot.username) {
        bot.safechat('/tell ' + username + ' 什么' + value + '？');
      } else if (key === value) {
        bot.safechat('/tell ' + username + ' 你在说什么')
      } else if (key.startsWith('/') || value.startsWith('/')) {
        bot.safechat('/tell ' + username + ' 命令是记不住的')
        bot.log('[data-record] *拒绝* ' + username + ' 的记忆 ' + key + ':' + value + ' 的注册被拒绝');
      } else if (key.startsWith('.') || value.startsWith('.')) {
        bot.safechat('/tell ' + username + ' HackClient的命令是记不住的')
        bot.log('[data-record] *拒绝* ' + username + ' 的记忆 ' + key + ':' + value + ' 的注册被拒绝');
      } else {
        record(key, value, username);
        bot.safechat('いま' + username + 'が教えてくれたんだけど、' + key + 'は ' + value + ' なんだって');
        bot.log('[data-record] sender: ' + username + ', key: {' + key + '}, value: {' + value + '}');

        this.last_record_user = username;
        this.last_record_key = key;
      }
    }

    // 记忆删除
    if (message.match(/^(?:删除|消去)\s+(\S*)/)) {
      var key = RegExp.$1;
      remove(key);
      
      bot.log('[data-record] sender: ' + username + ', key: {' + key + '}');
    }
  });
}