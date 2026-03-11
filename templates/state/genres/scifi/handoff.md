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
mission_phase = ""   # 任务当前阶段
ship_location = ""   # 飞船/载具位置
alert_level = ""     # 警戒等级

[pending_tasks]
tasks = []

[tech_state]
# 关键技术系统的状态
systems = []

[context_notes]
notes = []

[files_modified]
files = []
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| mission_phase | string | 任务执行到哪个阶段 |
| ship_location | string | 飞船或载具的当前坐标/位置 |
| alert_level | string | 当前警戒等级 |
| systems | array | 关键系统状态列表 |
