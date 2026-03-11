# 时间线

> 全书时间线追踪。科幻题材需注意时间膨胀、通讯延迟、相对时间。

```toml
schema_version = 1

[[events]]
event_id = ""
chapter = 0
absolute_time = ""   # 绝对时间（标准纪年）
relative_time = ""   # 相对时间（任务第X天/出发后X个月）
local_time = ""      # 当地时间（如不同星球有不同时间）
event_type = ""      # mission/battle/discovery/crisis/transition/contact
description = ""
participants = []
location = ""        # 星系/行星/坐标
distance_from_base = ""  # 距基地的距离（影响通讯延迟）
tech_involved = ""   # 涉及的关键技术
consequences = ""
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| absolute_time | string | 宇宙标准时间 |
| relative_time | string | 任务相对时间 |
| local_time | string | 当地时间（不同星球可能不同） |
| distance_from_base | string | 距离基地的距离（影响通讯） |
| tech_involved | string | 涉及的关键技术 |
