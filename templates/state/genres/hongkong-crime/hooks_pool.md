# 伏笔池

> 所有待回收伏笔的唯一追踪文件。每次埋设新伏笔、回收旧伏笔、或大剧情节点后必须更新。

```toml
schema_version = 1

[[hooks]]
hook_id = ""
type = ""           # enemy_escaped/item_lost/mystery/grudge/oath/deal/identity/other
origin_chapter = 0  # 起始章节
description = ""    # 伏笔内容描述
status = "pending"  # pending/in_progress/recovered/abandoned
last_update_chapter = 0  # 最近推进章节
expected_recovery = ""   # 预期回收窗口（如 "卷2结束前"）
recovery_plan = ""       # 回收方案简述
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| hook_id | string | 伏笔唯一标识，如 "hook_001" |
| type | enum | 伏笔类型：逃敌/遗失宝物/谜团/仇恨/誓约/交易/身份/其他 |
| origin_chapter | int | 伏笔首次埋设的章节 |
| description | string | 伏笔内容的具体描述 |
| status | enum | pending（待回收）/in_progress（推进中）/recovered（已回收）/abandoned（已废弃） |
| last_update_chapter | int | 最近一次推进或提及的章节 |
| expected_recovery | string | 预期在什么时间点回收 |
| recovery_plan | string | 计划如何回收 |
| notes | string | 备注信息 |

## 重点追踪

- 逃走的敌人
- 没拿到的资源/宝物
- 未解释的神秘事件
- 未兑现的交易/承诺
- 血仇和誓约
- 暗线身份
