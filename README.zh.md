# NTBot

> 一个用 Mineflayer 做的 Minecraft 机器人

[![Open in Visual Studio Code Online](https://img.shields.io/badge/-open%20in%20vscode-blue?style=for-the-badge&logo=visualstudiocode)](https://open.vscode.dev/xiaozhu2007/NTBot) ![Next Version](https://img.shields.io/npm/v/ntbot/next.svg?style=for-the-badge&logo=npm) ![Beta Version](https://img.shields.io/npm/v/ntbot/beta.svg?style=for-the-badge&logo=npm) ![Downloads](https://img.shields.io/npm/dw/ntbot?logo=npm&style=for-the-badge) ![Total downloads](https://img.shields.io/npm/dt/ntbot?style=for-the-badge&logo=npm)

[English](./README.md) | 简体中文

## 特色

- 模块化函数
- 移动去设置的地点
- 跟踪玩家
- 快速搜索(Support Baidu / Google / DuckDuckGo)
- 进服欢迎消息
- 倒计时[WIP]
- 数据记录器
- 自动登录
- 命令行支持

## 安装

```bash
    $ git clone https://gitee.com/xiaozhu2007/NTBot
    $ cd NTBot
    $ npm install
```

### 设置环境变量

Copy `.env.sample` to `.env`(e.g. `cp .env.sample .env`)

```env
NT_HOST="localhost"
NT_PORT="25565"
NT_USERNAME="user@foo.bar"
NT_PASSWORD="password"
LOGIN="no"
LOGIN_PASSWORD="passwd"
```

## 用法

### 启动

```txt
    $ npm start
```

## 用 Docker 启动

### 建设 Docker 镜像

```bash
docker build -t <yourname>/NTBot .
```

### 运行

```bash
docker run -d \
  --name NTBot \
  <yourname>/NTBot
```

## 开源许可证

[WTFPL](LICENSE)

## 引用自

- TemzinBot
