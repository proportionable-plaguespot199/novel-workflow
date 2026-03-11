# 角色档案

> 记录所有出场角色的当前状态、关系、立场。角色状态变化时必须同步更新。

```toml
schema_version = 1

[[characters]]
id = ""
name = ""
alias = ""          # 绰号/代号
role = ""           # protagonist/antagonist/ally/neutral/minor
status = "alive"    # alive/dead/missing/imprisoned/exiled
affiliation = ""    # 所属势力/组织
position = ""       # 职位/地位
motivation = ""     # 核心动机
fear = ""           # 核心恐惧
chips = ""          # 手中筹码
relationship_to_protagonist = ""  # 与主角的关系
last_appearance = 0 # 最后出场章节
notes = ""          # 备注
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 角色唯一标识，如 "char_001" |
| name | string | 角色全名 |
| alias | string | 绰号或代号 |
| role | enum | 角色定位：protagonist/antagonist/ally/neutral/minor |
| status | enum | 生存状态：alive/dead/missing/imprisoned/exiled |
| affiliation | string | 所属势力或组织 |
| position | string | 在组织中的职位或社会地位 |
| motivation | string | 核心驱动力（一句话） |
| fear | string | 最大的恐惧或弱点 |
| chips | string | 手中可打出的筹码 |
| relationship_to_protagonist | string | 与主角的当前关系 |
| last_appearance | int | 最后出场的章节编号 |
| notes | string | 其他需要追踪的信息 |
