# 时间线

> 全书时间线追踪。玄幻题材侧重修炼进度、大战节点、地图迁移。

```toml
schema_version = 1

[[events]]
event_id = ""
chapter = 0
story_time = ""      # 故事内时间描述（如 "入宗第三年春"）
event_type = ""      # battle/breakthrough/devour/migration/plot/faction_shift
description = ""
participants = []
location = ""
map_region = ""      # 所属大地图区域
realm_at_time = ""   # 主角此时境界
consequences = ""
power_change = ""    # 战后实力变化
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| event_id | string | 事件唯一标识 |
| story_time | string | 故事内时间（玄幻通常用相对时间） |
| event_type | enum | 战斗/突破/吞噬/迁移/剧情/势力变动 |
| map_region | string | 所属大地图区域 |
| realm_at_time | string | 事件发生时主角的境界 |
| power_change | string | 事件造成的实力变化 |
