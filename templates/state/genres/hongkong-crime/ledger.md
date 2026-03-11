# 资源账本

> 追踪主角和关键势力的资源变动。每次涉及金钱、地盘、人脉、武力等资源变化时必须更新。

```toml
schema_version = 1

[[ledger_entries]]
entry_id = ""
chapter = 0          # 发生章节
type = ""            # income/expense/asset_gain/asset_loss/debt/investment
category = ""        # money/territory/manpower/intel/weapon/connection/other
description = ""     # 具体描述
amount = ""          # 具体金额或数量
source = ""          # 来源
destination = ""     # 去向
balance_after = ""   # 变动后余额/状态
evidence = ""        # 正文中的依据
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| entry_id | string | 记录唯一标识，如 "led_001" |
| chapter | int | 发生变动的章节 |
| type | enum | 变动类型：收入/支出/资产获得/资产失去/负债/投资 |
| category | enum | 资源类别：金钱/地盘/人手/情报/武器/人脉/其他 |
| description | string | 具体的变动内容 |
| amount | string | 具体金额或数量（不写"大量""若干"） |
| source | string | 资源来源 |
| destination | string | 资源去向 |
| balance_after | string | 变动后的总量或状态 |
| evidence | string | 正文中的对应描述 |
| notes | string | 备注 |

## 追踪重点

- 现金流（港币为主，注意年代物价）
- 地盘和产业（场子、码头、工厂、铺面）
- 人手和武力
- 情报和人脉网络
- 负债和人情债
