import { Movements } from "mineflayer-pathfinder";
import { goals } from "mineflayer-pathfinder";
const { GoalNear } = goals;

export default function (bot) {
  const mcData = require("minecraft-data")(bot.version);
  const defaultMove = new Movements(bot, mcData);
  defaultMove.allowFreeMotion = true;

  bot.on("chat", (username, message) => {
    if (username === bot.username) {
      return;
    }

    var target = bot.players[username].entity;
    if (message.match(/(\w*)\W*(?:here|来?)/) && RegExp.$1 === bot.username) {
      if (target) {
        bot.log("[bot.navigate] to: " + target.position);
        bot.pathfinder.setMovements(defaultMove);
        bot.pathfinder.setGoal(
          target.position.x,
          target.position.y,
          target.position.z
        );
      } else {
        bot.randomchat(["OK", "来了", "等下"], 1000);
      }
    }
    if (message.match(/(\w*)\W*(?:stop|停止)/) && RegExp.$1 === bot.username) {
      bot.log("[bot.navigate] stop");
      bot.pathfinder.setGoal(null);
    }
  });
}
