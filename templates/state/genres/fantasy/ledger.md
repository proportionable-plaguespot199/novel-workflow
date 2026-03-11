# 资源账本

> 追踪主角的核心资源变动，特别是微粒/修炼进度的数值变化。每次吞噬、掠夺、突破后必须更新。

```toml
schema_version = 1

[[ledger_entries]]
entry_id = ""
chapter = 0
type = ""            # devour/plunder/breakthrough/trade/loss/consumption
target = ""          # 吞噬/掠夺对象
target_realm = ""    # 对象境界
target_quality = ""  # 完整度/稀有性/品质
amount_gained = 0    # 增量
diminish_ratio = ""  # 衰减比例（同质折损）
balance_before = 0   # 期初值
balance_after = 0    # 期末值
cap = 0              # 上限值
justification = ""   # 数值依据（为什么是这个增量）
comparable_sample = ""  # 参考样本（最近的同档增量记录）
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| entry_id | string | 记录唯一标识 |
| type | enum | 吞噬/掠夺/突破/交易/损失/消耗 |
| target | string | 资源来源（吞噬对象名称） |
| target_realm | string | 对象的境界 |
| target_quality | string | 资源品质描述（完整度、稀有性） |
| amount_gained | int | 获得的具体增量 |
| diminish_ratio | string | 同质资源的衰减比例 |
| balance_before | int | 本次变动前的总值 |
| balance_after | int | 本次变动后的总值 |
| cap | int | 数值上限 |
| justification | string | 为什么增量是这个数值 |
| comparable_sample | string | 最近的同类参考样本 |
