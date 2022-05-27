# NTBot

一个用Mineflayer做的Minecraft机器人

![Version](https://img.shields.io/badge/version-1.0.0-green?logo=npm&style=flat-square&cacheSeconds=3600 "版本")
![XMR捐赠](https://img.shields.io/badge/XMR-45p2voRaswNADCGCY4pUMEUSfuB6KcjbAcCrhMQQfyCTCmcnBew89nqXcKkAGoMqujTTapzkVCYXGa7sVCEJTgNiAGnyrBo-red?style=flat-square&cacheSeconds=600 "捐赠")

> 新版本，新特色，新内核 
> 欢迎体验NTBot
-----

## Features 特色

### 优势

  - 进服消息
  - 模块化函数
    - 移动去设置的地点
    - 跟踪玩家
    - 快速百度
    - 进服欢迎消息
    - 3秒倒计时
    - Data 记录器
  - 命令行接口
  - 支持 Docker 运行


## 安装
```bash
    $ git clone https://gitee.com/xiaozhu2007/NTBot
    $ cd NTBot
    $ npm install
```

### 设置环境变量

替换 .env.sample 成 .env。(例如使用指令 `cp .env.sample .env`)

```env
MC_HOST="localhost"
MC_PORT="25565"
MC_USERNAME="user@foo.bar"
MC_PASSWORD="password"
LOGIN="no"
LOGIN_PASSWORD="passwd"
```

## Usage 用法


### 启动

    $ npm start


## Docker 用Docker启动

### 建设Docker镜像

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
<!-- hhh -->

## 作者

[Pig2333](https://gitee.com/xiaozhu2007)

## Ref

 * TemzinBot
