const Vec3 = require("vec3").Vec3
const Movements = require("mineflayer-pathfinder").Movements
const { GoalFollow, GoalInvert } = require("mineflayer-pathfinder").goals

module.exports = function (bot) {
    const mcData = require("minecraft-data")(bot.version)
    const defaultMove = new Movements(bot, mcData)
    defaultMove.allowFreeMotion = true

    // 获取跟踪对象Target
    var target_entity = undefined

    function getTargetEntity() {
        return target_entity
    }
    function setTargetEntity(entity = undefined) {
        if (target_entity !== entity) {
            target_entity = entity
        }
    }

    var interest_entity = undefined

    function getInterestEntity() {
        return interest_entity
    }
    function setInterestEntity(entity = undefined) {
        if (interest_entity !== entity) {
            interest_entity = entity
            if (interest_entity) {
                var name =
          interest_entity.name !== undefined
              ? interest_entity.name
              : interest_entity.username
                var type = interest_entity.type
                var kind = interest_entity.kind
                bot.log(
                    "[bot.setInterestEntity] " +
            bot.username +
            " is interested in " +
            name +
            " (" +
            type +
            (kind !== undefined ? ":" + kind : "") +
            ")"
                )
            }
        }
    }

    function RotToVec3(pitch, yaw, rad) {
        return new Vec3(
            -rad * Math.cos(pitch) * Math.sin(yaw),
            rad * Math.sin(pitch),
            -rad * Math.cos(pitch) * Math.cos(yaw)
        )
    }

    function Vec3ToRot(vec) {
        return {
            pitch: Vec3ToPitch(vec),
            yaw: Vec3ToYaw(vec),
            radius: vec.distanceTo(new Vec3(null)),
        }
    }

    function Vec3ToPitch(vec) {
        var groundDist = Math.sqrt(vec.x * vec.x + vec.z * vec.z)
        return Math.atan2(-vec.y, groundDist)
    }

    function Vec3ToYaw(vec) {
        var yaw
        if (vec.x != 0.0) {
            yaw = Math.atan2(vec.x, vec.z)
        } else {
            yaw = vec.z >= 0 ? Math.PI / 2 : -Math.PI / 2
        }
        return yaw
    }

    bot.on("entitySwingArm", (entity) => {
        var distance = bot.entity.position.distanceTo(entity.position)

        if (entity.type === "player") {
            if (distance < 4) {
                var lookat = RotToVec3(entity.pitch, entity.yaw, distance)
                var dt = bot.entity.position.distanceTo(lookat.add(entity.position))

                if (dt < 0.3) {
                    bot.log("[bot.entitySwingArm] " + entity.username + " hit me!")
                    setTargetEntity(getTargetEntity() !== entity ? entity : undefined)
                }
            }
        }
    })

    bot.on("playerCollect", (collector, collected) => {
        if (getInterestEntity() === collected) {
            setInterestEntity()

            if (collector !== bot.entity) {
                setInterestEntity(collector)
            }
        }
    })

    bot.on("entityMoved", (entity) => {
        var distance = bot.entity.position.distanceTo(entity.position)

        if (entity.type === "player" && distance < 0.8) {
            var botpos = bot.entity.position.clone()
            var entpos = entity.position.clone()
            botpos.y = entpos.y = 0
            botpos.subtract(entpos)
            bot.entity.velocity.add(botpos.scaled(60))
        }

        if (distance < 3) {
            if (!getInterestEntity()) {
                // 看实体
                setInterestEntity(entity)
            } else {
                if (
                    bot.entity.position.distanceTo(getInterestEntity().position) >
          distance
                )
                    setInterestEntity(entity)
            }
        }

        if (distance > 6) {
            if (getInterestEntity() === entity) setInterestEntity()
        }
    })

    setInterval(() => {
        var target = getTargetEntity()
        var interest = getInterestEntity()

        var entity
        if (target) {
            entity = target
        } else if (interest) {
            entity = interest
        }

        if (entity) {
            var pos = bot.entity.position.clone()
            pos.subtract(entity.position)
            var rot = Vec3ToRot(pos)

            if (
                Math.abs(rot.yaw - bot.entity.yaw) > 0.05 ||
        Math.abs(rot.pitch - bot.entity.pitch) > 0.05
            ) {
                bot.look(rot.yaw, rot.pitch, false, false)
            }

            if (
                target &&
        target.onGround /*&& target.controlState['jump'] === false*/
            ) {
                //根据与对象的距离移动
                var dist = bot.entity.position.distanceTo(entity.position)
                if (dist > 3) {
                    bot.pathfinder.setMovements(defaultMove)
                    bot.pathfinder.setGoal(
                        new GoalInvert(new GoalFollow(target, 1)),
                        true
                    )
                } else {
                    bot.pathfinder.setGoal(null)
                }
            }
        }
    }, 1000)

    setInterval(() => {
        var interest = getInterestEntity()
        if (interest) {
            var isSneaking = false
            var isJumping = false

            if (interest.kind === "Drops") {
                isSneaking = true
            } else if (interest.kind) {
                if (bot.controlState["front"] === true) {
                    isJumping = true
                }
            } else {
                if (interest.metadata["0"] === 2) {
                    isSneaking = true
                } else {
                    isSneaking = bot.entity.position.y - interest.position.y > 2
                }
            }
            bot.setControlState("sneak", isSneaking)
            bot.setControlState("jump", isJumping)
        }
    }, 200)
}
