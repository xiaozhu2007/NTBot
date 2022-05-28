# NTBot

一个用Mineflayer做的Minecraft机器人

[![Open in Visual Studio Code](https://img.shields.io/badge/-open%20in%20vscode-blue?style=for-the-badge&logo=visualstudiocode)](https://open.vscode.dev/xiaozhu2007/NTBot)[![Version](https://img.shields.io/npm/v/ntbot/next.svg?style=for-the-badge&logo=npm) ![Downloads](https://img.shields.io/npm/dw/ntbot?logo=npm&style=for-the-badge) ![Total downloads](https://img.shields.io/npm/dt/ntbot?style=for-the-badge&logo=npm) ![Size](https://img.shields.io/bundlephobia/min/ntbot?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/ntbot)


## Features / 特色

- Module / 模块化函数
- Auto Move / 移动去设置的地点
- Follow Player(s) / 跟踪玩家
- Fast Search / 快速搜索(Support Baidu / Google / DuckDuckGo)
- 进服欢迎消息
- 倒计时[WIP]
- Data Recorder / 数据记录器
- Auto Login / 自动登录
- CLI / 命令行接口


## Installtion / 安装
```bash
    $ git clone https://gitee.com/xiaozhu2007/NTBot
    $ cd NTBot
    $ npm install
```

### 设置环境变量

Copy `.env.sample` to `.env`(e.g. `cp .env.sample .env`)

```env
MC_HOST="localhost"
MC_PORT="25565"
MC_USERNAME="user@foo.bar"
MC_PASSWORD="password"
LOGIN="no"
LOGIN_PASSWORD="passwd"
```

## Usage / 用法


### Start / 启动

    $ npm start


## Docker / 用Docker启动

### Build / 建设Docker镜像

```bash
docker build -t <yourname>/NTBot .
```

### Run / 运行

```bash
docker run -d \
  --name NTBot \
  <yourname>/NTBot
```

## LICENCE / 开源许可证

[WTFPL](LICENSE)

## Ref
 * TemzinBot
