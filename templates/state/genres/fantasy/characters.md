# 角色档案

> 记录所有出场角色的当前状态、关系、立场。角色状态变化时必须同步更新。

```toml
schema_version = 1

[[characters]]
id = ""
name = ""
title = ""           # 称号/道号
role = ""            # protagonist/antagonist/ally/neutral/minor
status = "alive"     # alive/dead/missing/sealed/soul_damaged
realm = ""           # 修炼境界
affiliation = ""     # 所属宗门/势力/种族
bloodline = ""       # 血脉/体质
combat_style = ""    # 战斗风格
motivation = ""      # 核心动机
fear = ""            # 核心恐惧
chips = ""           # 手中筹码（底牌/资源/情报）
known_info = ""      # 已知的信息（信息边界）
relationship_to_protagonist = ""
last_appearance = 0
death_chapter = 0    # 死亡章节（0 表示存活）
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 角色唯一标识 |
| title | string | 称号或道号 |
| realm | string | 修炼境界 |
| bloodline | string | 特殊血脉或体质 |
| combat_style | string | 战斗风格特征 |
| known_info | string | 该角色当前已知的信息（用于信息边界校验） |
| death_chapter | int | 死亡章节，0 表示存活，用于防止已死角色复活 |
