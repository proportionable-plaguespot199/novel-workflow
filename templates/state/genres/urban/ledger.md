# 资源账本

> 追踪主角和关键角色的资源变动。都市题材侧重金融资产、人脉、信息、社会资本。

```toml
schema_version = 1

[[ledger_entries]]
entry_id = ""
chapter = 0
type = ""            # income/expense/investment/debt/asset_gain/asset_loss/favor
category = ""        # cash/stock/property/company/connection/info/reputation/other
description = ""
amount = ""          # 具体金额或描述
source = ""
destination = ""
balance_after = ""
legal_risk = ""      # 合法/灰色/违法
evidence = ""
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| type | enum | 收入/支出/投资/负债/资产获得/资产失去/人情 |
| category | enum | 现金/股票/房产/公司/人脉/情报/声誉/其他 |
| legal_risk | enum | 这笔交易的法律风险等级 |

## 追踪重点

- 银行账户和现金流
- 股票和投资组合
- 房产和固定资产
- 公司股权和控制权
- 人脉网络和人情债
- 关键情报和证据
- 社会声誉和影响力
