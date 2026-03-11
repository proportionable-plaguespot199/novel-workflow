# 资源账本

> 追踪关键资源的消耗和获取。科幻题材侧重燃料、弹药、补给、技术资源。

```toml
schema_version = 1

[[ledger_entries]]
entry_id = ""
chapter = 0
type = ""            # consume/resupply/salvage/trade/produce/loss
category = ""        # fuel/ammo/food/medical/tech/data/currency/other
item = ""            # 具体物品名称
quantity_change = "" # 变动量（+/-）
quantity_after = ""  # 变动后存量
critical_threshold = ""  # 临界值（低于此值触发危机）
source = ""          # 来源/去向
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| type | enum | 消耗/补给/打捞/交易/生产/损失 |
| category | enum | 燃料/弹药/食物/医疗/技术/数据/货币/其他 |
| critical_threshold | string | 低于此值会触发生存危机 |

## 追踪重点

- 飞船燃料和能量储备
- 弹药和武器状态
- 食物和水的存量
- 医疗物资
- 关键技术组件和备件
- 数据存储和通讯资源
