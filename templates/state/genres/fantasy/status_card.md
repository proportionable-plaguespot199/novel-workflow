# 当前状态卡

> 唯一的"当前时间点状态覆盖文件"。记录当前章节、境界、敌我关系、资源状态、活跃伏笔与本章任务。每次正文创作前必读，完成后必更新。

```toml
schema_version = 1

[current_chapter]
chapter_number = 0
chapter_title = ""
volume = ""

[anchor]
location = ""        # 当前地图/区域
sub_location = ""    # 具体地点
opponent = ""        # 当前主要对手
goal = ""            # 主角即时目标

[protagonist]
name = ""
realm = ""           # 当前境界
realm_progress = ""  # 境界内进度
combat_power = ""    # 战力锚点描述
status = ""          # 健康/受伤/法力枯竭/...
known_identity = ""  # 已暴露的身份
hidden_identity = "" # 未暴露的身份
current_resources = ""  # 当前核心资源概述
particle_count = 0   # 微粒开启数（如适用）
particle_cap = 0     # 微粒上限（如适用）

[external_aid]
system_name = ""     # 外挂/系统名称
system_status = ""   # 外挂当前状态
available_abilities = []  # 当前可用能力

[active_hooks]
hooks = []

[chapter_task]
type = ""            # 战斗章/布局章/过渡章/回收章
main_conflict = ""
constraints = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| chapter_number | int | 当前章节编号 |
| realm | string | 当前修炼境界 |
| realm_progress | string | 境界内进度（初期/中期/巅峰） |
| combat_power | string | 战力锚点（可越级几阶） |
| particle_count | int | 微粒/核心数值当前值 |
| particle_cap | int | 数值上限 |
| system_name | string | 外挂名称 |
| system_status | string | 外挂运行状态 |
| available_abilities | array | 当前已解锁的能力列表 |
