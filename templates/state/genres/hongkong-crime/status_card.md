# 当前状态卡

> 唯一的"当前时间点状态覆盖文件"。记录当前章节、时间线、主角状态、敌我关系、活跃伏笔与本章任务。每次正文创作前必读，完成后必更新。

```toml
schema_version = 1

[current_chapter]
chapter_number = 0
chapter_title = ""
volume = ""

[anchor]
time = ""          # 故事内时间，如 "1985年3月15日 下午"
location = ""      # 当前地点
opponent = ""      # 当前主要对手
goal = ""          # 主角即时收益目标

[protagonist]
name = ""
status = ""        # 健康/受伤/潜伏/...
identity_public = ""   # 公开身份
identity_hidden = ""   # 隐藏身份
resources = ""     # 当前可用资源概述
allies = ""        # 当前盟友
threats = ""       # 当前威胁

[active_hooks]
# 当前活跃的伏笔，引用 hooks_pool 中的 hook_id
hooks = []

[chapter_task]
type = ""          # 布局章/事件章/过渡章/回收章
main_conflict = "" # 本章主冲突一句话概括
constraints = ""   # 本章硬约束
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| chapter_number | int | 当前章节编号 |
| chapter_title | string | 章节标题 |
| volume | string | 所属分卷 |
| time | string | 故事内时间 |
| location | string | 当前场景地点 |
| opponent | string | 当前主要对手 |
| goal | string | 主角此刻的收益目标 |
| status | string | 主角身体/处境状态 |
| identity_public | string | 对外身份 |
| identity_hidden | string | 真实/隐藏身份 |
| resources | string | 当前可调用的资源 |
| allies | string | 当前盟友列表 |
| threats | string | 当前面临的威胁 |
| hooks | array | 活跃伏笔的 hook_id 列表 |
| type | string | 章节类型 |
| main_conflict | string | 一句话概括主冲突 |
| constraints | string | 本章硬约束 |
