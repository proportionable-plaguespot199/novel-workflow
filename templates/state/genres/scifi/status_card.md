# 当前状态卡

> 唯一的"当前时间点状态覆盖文件"。科幻题材侧重技术状态、任务进度、资源消耗。

```toml
schema_version = 1

[current_chapter]
chapter_number = 0
chapter_title = ""
volume = ""

[anchor]
time = ""            # 故事内时间（星历/标准纪年）
location = ""        # 当前位置（星系/空间站/行星）
sub_location = ""    # 具体场景（舱室/实验室/地表）
opponent = ""        # 当前主要对手/威胁
mission = ""         # 当前任务目标

[protagonist]
name = ""
status = ""          # 健康/受伤/感染/冬眠/...
role = ""            # 职务/身份
tech_access = ""     # 当前可用的技术和设备
ship_status = ""     # 飞船/载具状态（如适用）
crew_status = ""     # 团队状态
resources = ""       # 关键资源（燃料/弹药/补给）
intel = ""           # 当前已知情报

[active_hooks]
hooks = []

[chapter_task]
type = ""
main_conflict = ""
constraints = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| time | string | 科幻时间表示（星历或其他纪年） |
| mission | string | 当前执行的任务 |
| tech_access | string | 可使用的技术和设备 |
| ship_status | string | 飞船或载具的当前状态 |
| crew_status | string | 团队成员状态 |
| resources | string | 关键消耗品的存量 |
| intel | string | 已获取的关键情报 |
