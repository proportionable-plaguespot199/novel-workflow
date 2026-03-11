# 伏笔池

> 所有待回收伏笔的唯一追踪文件。科幻题材侧重技术谜团、信号来源、未知威胁。

```toml
schema_version = 1

[[hooks]]
hook_id = ""
type = ""           # signal/anomaly/tech_mystery/enemy_fled/artifact/conspiracy/prophecy/other
origin_chapter = 0
description = ""
status = "pending"  # pending/in_progress/recovered/abandoned
last_update_chapter = 0
expected_recovery = ""
recovery_plan = ""
related_characters = []
threat_level = ""   # low/medium/high/existential
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| type | enum | 信号/异常/技术谜团/逃敌/遗物/阴谋/预言/其他 |
| threat_level | enum | 威胁等级（含存亡级） |

## 重点追踪

- 不明信号/通讯的来源
- 技术异常和未解释现象
- 逃走的敌对势力
- 未回收的外星遗物/技术
- 隐藏的阴谋和暗线
- AI 行为异常
