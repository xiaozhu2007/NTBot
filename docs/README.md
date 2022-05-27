# QBot
-----

一个用Mineflayer做的Minecraft机器人


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
    $ git clone https://gitee.com/xiaozhu2007/qbot
    $ cd qbot
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
docker build -t <yourname>/qbot .
```

### 运行

```bash
docker run -d \
  --name qbot \
  <yourname>/qbot
```

## 开源许可证

[WTFPL](LICENSE)
<!-- hhh -->

## 作者

[Pig2333](https://gitee.com/xiaozhu2007)

## Ref

 * TemzinBot
