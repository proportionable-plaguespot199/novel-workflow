# 章节交接卡

> 跨会话续写时的上下文交接文件。每次创作会话结束时更新，下次会话开始时首先读取。

```toml
schema_version = 1

[last_session]
date = ""
chapter_completed = 0
chapter_in_progress = 0

[continuation_point]
last_paragraph = ""
scene_state = ""
battle_state = ""    # 如果中断在战斗中，记录战斗状态
current_realm = ""   # 主角当前境界
particle_count = 0   # 当前微粒数

[pending_tasks]
tasks = []

[unresolved_from_session]
# 本次会话发现但未解决的问题
issues = []

[context_notes]
notes = []

[files_modified]
files = []
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| battle_state | string | 中断在战斗中时的战斗状态 |
| current_realm | string | 交接时主角的境界 |
| particle_count | int | 交接时的微粒数值 |
| issues | array | 发现但未解决的问题列表 |
