# 角色档案

> 记录所有出场角色的当前状态、关系、立场。都市题材侧重社会身份和人脉网络。

```toml
schema_version = 1

[[characters]]
id = ""
name = ""
role = ""            # protagonist/antagonist/ally/neutral/minor
status = "active"    # active/inactive/dead/imprisoned/abroad
occupation = ""      # 职业/职位
company = ""         # 所属公司/机构
social_class = ""    # 阶层定位
financial_power = "" # 经济实力等级
motivation = ""      # 核心动机
weakness = ""        # 弱点/把柄
resources = ""       # 可调用的资源
known_info = ""      # 已掌握的关键信息
relationship_to_protagonist = ""
last_appearance = 0
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| occupation | string | 职业和具体职位 |
| social_class | string | 社会阶层定位 |
| financial_power | string | 经济实力等级 |
| weakness | string | 弱点或可利用的把柄 |
| known_info | string | 该角色当前掌握的关键信息 |
