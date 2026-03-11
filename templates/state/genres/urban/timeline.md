# 时间线

> 全书时间线追踪。都市题材使用现实日历，精确到日期和星期。

```toml
schema_version = 1

[[events]]
event_id = ""
chapter = 0
date = ""            # 精确日期，如 "2024-06-15"
day_of_week = ""     # 星期几
time_of_day = ""     # 上午/下午/晚上/深夜
event_type = ""      # business/legal/social/conflict/investigation/personal
description = ""
participants = []
location = ""
consequences = ""
public_visibility = ""  # 公开事件/私密事件/半公开
media_coverage = ""     # 是否有媒体报道
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 精确日期 |
| day_of_week | string | 星期几（工作日/周末影响剧情） |
| event_type | enum | 商业/法律/社交/冲突/调查/个人 |
| public_visibility | enum | 事件的公开程度 |
| media_coverage | string | 媒体报道情况 |
