# 时间线

> 全书时间线追踪。记录关键事件的发生时间，防止时间线断裂和年代穿帮。

```toml
schema_version = 1

[[events]]
event_id = ""
chapter = 0          # 章节编号
story_date = ""      # 故事内日期，如 "1985-03-15"
story_time = ""      # 故事内时间段，如 "下午" "深夜"
duration = ""        # 事件持续时间
event_type = ""      # plot/deal/conflict/transition/backstory
description = ""     # 事件简述
participants = []    # 参与角色
location = ""        # 发生地点
consequences = ""    # 直接后果
real_world_anchor = ""  # 对应的真实历史事件（如有）
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| event_id | string | 事件唯一标识，如 "evt_001" |
| chapter | int | 事件发生的章节 |
| story_date | string | 故事内日期 |
| story_time | string | 故事内时间段 |
| duration | string | 事件持续时间 |
| event_type | enum | 事件类型：主线剧情/交易/冲突/过渡/背景 |
| description | string | 事件简述 |
| participants | array | 参与角色列表 |
| location | string | 发生地点 |
| consequences | string | 事件的直接后果 |
| real_world_anchor | string | 对应的真实历史事件（用于年代校准） |
| notes | string | 备注 |

## 年代锚点（港综）

用真实历史事件作为时间线校准锚点：

| 年份 | 真实事件 | 可用于 |
|------|----------|--------|
| 1984 | 中英联合声明 | 政治背景、不确定性 |
| 1987 | 香港股灾 | 金融剧情、资产洗牌 |
| 1989 | 六四事件后移民潮 | 人物去留、资产转移 |
| 1993 | 恒生指数突破万点 | 经济繁荣、地产泡沫 |
| 1997 | 香港回归 | 权力交接、身份认同 |
