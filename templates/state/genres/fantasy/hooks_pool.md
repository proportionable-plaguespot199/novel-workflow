# 伏笔池

> 所有待回收伏笔的唯一追踪文件。重点追踪：逃走的敌人、未获取的宝物、未解释的神秘事件。

```toml
schema_version = 1

[[hooks]]
hook_id = ""
type = ""           # enemy_escaped/treasure_lost/mystery/grudge/prophecy/sealed_entity/inheritance/other
origin_chapter = 0
description = ""
status = "pending"  # pending/in_progress/recovered/abandoned
last_update_chapter = 0
expected_recovery = ""
recovery_plan = ""
related_characters = []  # 关联角色
threat_level = ""        # low/medium/high/critical
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| hook_id | string | 伏笔唯一标识 |
| type | enum | 逃敌/遗失宝物/谜团/仇恨/预言/封印实体/传承/其他 |
| related_characters | array | 与此伏笔相关的角色 |
| threat_level | enum | 此伏笔未回收可能造成的威胁等级 |

## 重点追踪

- 逃走的敌人（何时反扑）
- 没拿到的宝物（谁拿走了）
- 未解释的神秘耳语/异象
- 封印中的恐怖存在
- 未兑现的预言/传承
- 血仇和因果
