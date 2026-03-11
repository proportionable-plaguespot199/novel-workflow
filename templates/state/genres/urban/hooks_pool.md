# 伏笔池

> 所有待回收伏笔的唯一追踪文件。都市题材侧重信息差、隐藏关系、未兑现交易。

```toml
schema_version = 1

[[hooks]]
hook_id = ""
type = ""           # secret/deal/betrayal/evidence/debt/identity/investigation/other
origin_chapter = 0
description = ""
status = "pending"  # pending/in_progress/recovered/abandoned
last_update_chapter = 0
expected_recovery = ""
recovery_plan = ""
related_characters = []
impact_level = ""   # low/medium/high/critical
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| type | enum | 秘密/交易/背叛/证据/债务/身份/调查/其他 |
| impact_level | enum | 此伏笔回收时的影响等级 |

## 重点追踪

- 未公开的秘密（谁知道谁不知道）
- 未兑现的交易和承诺
- 隐藏的背叛和暗中操作
- 关键证据的下落
- 未偿还的债务和人情
- 暗线身份和隐藏关系
